const {
  createBid,
  updateAllBidToOutbid,
} = require("../repositories/bid.repository");
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

      try {
        const auction = await Auction.findById(roomId);

        if (!auction) {
          console.log("no auctionID");
          return socket.emit("error", "Auction not found");
        }
        if (new Date(auction.endTime) > new Date()) {
          console.log("no auctionID");
          return socket.emit("error", "Auction has ended");
        }

        if (!auction.currentBid || bid.bidAmount > auction.currentBid) {
          console.log("case 1: more than currentBid");
          if (auction.currentBid) {
            await updateAllBidToOutbid(auction._id);
          }

          auction.currentBid = bid.bidAmount;
          await auction.save();

          bid.status = "Winning";
        } else {
          console.log("case 2: lower");
          bid.status = "Outbid";
        }

        const newBid = await createBid(bid);

        socket.to(roomId).emit("newBid", {
          amount: newBid.bidAmount,
          user: newBid.userID,
          status: newBid.status,
        });

        console.log(`New bid in room ${roomId}: ${newBid.bidAmount}`);
      } catch (error) {
        console.error("Error processing bid:", error);
        socket.emit("error", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
