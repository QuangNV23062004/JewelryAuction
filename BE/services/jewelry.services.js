// File: services/jewelry.service.js
const jewelryRepository = require("../repositories/jewelry.repository");

const createJewelry = async (jewelryData) => {
  return await jewelryRepository.createJewelry(jewelryData);
};

const getAllJewelry = async () => {
  return await jewelryRepository.getAllJewelry();
};

const getJewelry = async (id) => {
  return await jewelryRepository.getJewelry(id);
};

const updateJewelry = async (id, updatedData) => {
  return await jewelryRepository.updateJewelry(id, updatedData);
};

const deleteJewelry = async (id) => {
  return await jewelryRepository.deleteJewelry(id);
};

const getJewelryWithAuction = async () => {
  return await jewelryRepository.getJewelryWithAuction();
};

const getJewelryByStatus = async (statuses) => {
  return await jewelryRepository.getJewelryByStatus(statuses);
};

module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  deleteJewelry,
  getJewelryWithAuction,
  getJewelryByStatus,
};
