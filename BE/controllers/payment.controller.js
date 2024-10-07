const paymentService = require("../services/payment.services");

const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const payment = await paymentService.createPayment(paymentData);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentService.getPayment(id);
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
    const id = req.params.id;
    const updatedData = req.body;
    const payment = await paymentService.updatePayment(id, updatedData);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await paymentService.deletePayment(id);
    if (!result) {
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
};
