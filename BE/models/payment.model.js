const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer"],
    required: true,
  },
  auctionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    required: true,
  },
  jewelryStatus: {
    type: String,
    enum: ["Packaging", "Delivery", "Delivered"],
    required: false,
  },
  paytime: {
    type: Date,
    required: true,
  },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
module.exports = Payment;
