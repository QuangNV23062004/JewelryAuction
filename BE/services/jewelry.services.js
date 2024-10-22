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
  if (typeof statuses === "string" && statuses.includes(",")) {
    statuses = statuses.split(","); // Split into an array by comma
  }
  return await jewelryRepository.getJewelryByStatus(statuses);
};

const getJewelryStaffStatus = async (userId, statuses, type) => {
  if (typeof statuses === "string" && statuses.includes(",")) {
    statuses = statuses.split(","); // Split into an array by comma
  }
  return await jewelryRepository.getJewelryStaffStatus(userId, statuses, type);
};
module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  deleteJewelry,
  getJewelryWithAuction,
  getJewelryByStatus,
  getJewelryStaffStatus,
};
