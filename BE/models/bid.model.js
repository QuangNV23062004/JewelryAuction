const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auctionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date, // Correct type for timestamp
    required: true,
  },
  status: {
    type: String,
    enum: ["Winning", "Outbid", "Cancelled"], // Status options
    required: false,
  },
});

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;
