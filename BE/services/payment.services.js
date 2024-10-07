const paymentRepository = require("../repositories/payment.repository");

const createPayment = async (paymentData) => {
  return await paymentRepository.createPayment(paymentData);
};

const getAllPayments = async () => {
  return await paymentRepository.getAllPayments();
};

const getPayment = async (id) => {
  return await paymentRepository.getPayment(id);
};

const updatePayment = async (id, updatedData) => {
  return await paymentRepository.updatePayment(id, updatedData);
};

const deletePayment = async (id) => {
  return await paymentRepository.deletePayment(id);
};

module.exports = {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
