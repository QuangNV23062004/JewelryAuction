const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  jewelryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jewelry",
    required: true,
  },
  startTime: {
    type: Date, // Correct type for timestamp
    required: true,
  },
  endTime: {
    type: Date, // Correct type for timestamp
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Ongoing", "Completed", "Cancelled", "Unbidded"], // Status options
    required: true,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  winnerBid: {
    type: Number,
    required: false,
  },
  currentBid: {
    type: Number,
    required: false,
  },
});

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
