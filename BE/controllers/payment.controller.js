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
    const payment = await Payment.findOne({ auctionID: auctionId }); // Use findOne for a single result
    if (!payment) {
      console.log("No payment found for auction ID: " + auctionId);
    }
    return payment;
  } catch (error) {
    console.log(
      "Error fetching payment for auction: " + auctionId + " - " + error
    );
  }
};

const UpdatePaymentByAuctionID = async (auctionId, paymentData) => {
  try {
    // Ensure that auctionId and paymentData are valid
    if (!auctionId || !paymentData) {
      throw new Error("Invalid auctionId or payment data.");
    }

    // Find the payment by auctionId and update it with the new payment data
    const updatedPayment = await Payment.findOneAndUpdate(
      { auctionID: auctionId }, // Find the payment with the matching auctionID
      { $set: paymentData }, // Use $set to update the fields without replacing the whole document
      { new: true, runValidators: true } // Return the updated document and validate the input
    );

    // If no payment was found, log a message and return null
    if (!updatedPayment) {
      console.log("Payment not found for auction ID: " + auctionId);
      return null;
    }

    // Log the success and return the updated payment
    console.log("Payment updated successfully for auction ID: " + auctionId);
    console.log(updatedPayment);
    return updatedPayment;
  } catch (error) {
    console.log("Error updating payment for auction ID: " + auctionId, error);
    return null;
  }
};

module.exports = {
  UpdatePaymentByAuctionID,
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
  getPaymentByAuctionID,
  UpdatePaymentByAuctionID,
};
