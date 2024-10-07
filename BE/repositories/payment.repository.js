const Payment = require("../models/payment.model.js");

const createPayment = async (payment) => {
  //repo
  try {
    const paymentResponse = await Payment.create(payment);
    return paymentResponse;
    if (!paymentResponse) {
      console.log("fail to create payment: " + payment);
    }
  } catch (error) {
    console.log("error creating payment: " + error);
  }
};
const getPaymentByAuctionID = async (auctionId) => {
  //Repo
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
  //repo
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

const getAllPayments = async () => {
  return await Payment.find();
};

const getPayment = async (id) => {
  return await Payment.findById(id);
};

const updatePayment = async (id, updatedData) => {
  return await Payment.findByIdAndUpdate(id, updatedData, { new: true });
};

const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};
module.exports = {
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
  createPayment,
  UpdatePaymentByAuctionID,
  getPaymentByAuctionID,
};
