const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer"], // Payment methods
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
    enum: ["Pending", "Completed", "Failed"], // Status options
    required: true,
  },
  jewelryStatus: {
    type: String,
    enum: ["Packaging", "Delivery", "Delivered"], // Jewelry shipment status options
    required: false,
  },
  paytime: {
    type: Date, // Correct type for timestamp
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
