const Payment = require("../models/payment.model.js");

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createNewPayment = async (payment) => {
  try {
    const paymentResponse = await Payment.create(payment);
    if (!paymentResponse) {
      console.log("fail to create payment: " + payment);
    }
  } catch (error) {
    console.log("error creating payment: " + error);
  }
};
const getAllPayments = async (req, res) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPaymentByAuctionID = async (auctionId) => {
  try {
    const payment = await Payment.find({ auctionId: auctionId });
    if (!payment) {
      console.log("No payment found");
    }
    return payment;
  } catch (error) {
    console.log("Error getting payment for auction: " + auctionId);
  }
};
const UpdatePaymentByAuctionID = async (auctionId, payment) => {
  try {
    const paymentResponse = await Payment.find(
      { auctionID: auctionId },
      payment,
      {
        new: true,
      }
    );
    if (!paymentResponse) {
      console.log("fail to update payment: " + payment);
    }
  } catch (error) {
    console.log("error updating payment: " + error);
  }
};
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
  createNewPayment,
};
