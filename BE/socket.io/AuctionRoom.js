const {
  createBid2,
  updateAllBidToOutbid,
} = require("../controllers/bids.controller");
const Auction = require("../models/auction.model");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinAuctionRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("placeBid", async (data) => {
      const { roomId, bid } = data;

      const session = await Auction.startSession(); // Start a Mongoose session for transactions
      session.startTransaction(); // Start transaction

      try {
        const auction = await Auction.findById(roomId).session(session); // Fetch auction in session

        if (!auction) {
          await session.abortTransaction(); // Abort if auction not found
          return socket.emit("error", "Auction not found");
        }

        // Validate bid amount
        if (bid.bidAmount <= 0) {
          return socket.emit("error", "Bid amount must be positive.");
        }

        // Check if the new bid is higher than the current bid
        if (!auction.currentBid || bid.bidAmount > auction.currentBid) {
          if (auction.currentBid) {
            await updateAllBidToOutbid(auction._id, { session }); // Mark all previous bids as "Outbid"
          }

          auction.currentBid = bid.bidAmount; // Update auction with new highest bid
          await auction.save({ session });

          bid.status = "Winning"; // Set the new bid as "Winning"
        } else {
          bid.status = "Outbid"; // Mark the new bid as "Outbid" if it's lower than current bid
        }

        const newBid = await createBid2(bid, { session }); // Save the new bid

        await session.commitTransaction(); // Commit the transaction

        // Notify all clients in the room about the new bid
        io.in(roomId).emit("newBid", {
          amount: newBid.bidAmount,
          user: newBid.userID,
          status: newBid.status,
        });

        console.log(`New bid in room ${roomId}: ${newBid.bidAmount}`);
      } catch (error) {
        await session.abortTransaction(); // Abort the transaction on error
        console.error("Error processing bid:", error);
        socket.emit("error", error.message);
      } finally {
        session.endSession(); // End the session
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
