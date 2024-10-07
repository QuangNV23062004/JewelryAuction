// File: services/bid.services.js
const bidRepository = require("../repositories/bid.repository");

const createBid = async (bidData) => {
  return await bidRepository.createBid(bidData);
};

const getAllBid = async () => {
  return await bidRepository.getAllBid();
};

const getBid = async (id) => {
  return await bidRepository.getBid(id);
};

const updateBid = async (id, updatedData) => {
  return await bidRepository.updateBid(id, updatedData);
};

const deleteBid = async (id) => {
  return await bidRepository.deleteBid(id);
};

module.exports = {
  createBid,
  getAllBid,
  getBid,
  updateBid,
  deleteBid,
};
