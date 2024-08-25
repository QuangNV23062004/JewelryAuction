module.exports = function (io) {
  // Handle connection
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Event: User joins a room
    socket.on("joinAuctionRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Event: User places a bid
    socket.on("placeBid", (data) => {
      const { roomId, bidAmount } = data;

      // Broadcast the new bid to others in the room
      socket.to(roomId).emit("newBid", bidAmount);

      // (Optional) Update the bid in the database here
      // Example:
      // Auction.findByIdAndUpdate(roomId, { currentBid: bidAmount }, (err) => {
      //   if (err) console.error(err);
      // });

      console.log(`New bid in room ${roomId}: ${bidAmount}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
