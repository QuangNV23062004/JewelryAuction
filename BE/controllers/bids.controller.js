// File: controllers/bid.controller.js
const bidServices = require("../services/bid.services");

const createBid = async (req, res) => {
  try {
    const bid = await bidServices.createBid(req.body);
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBid = async (req, res) => {
  try {
    const bid = await bidServices.getAllBid();
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBid = async (req, res) => {
  try {
    const bid = await bidServices.getBid(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBid = async (req, res) => {
  try {
    const bid = await bidServices.updateBid(req.params.id, req.body);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBid = async (req, res) => {
  try {
    const bid = await bidServices.deleteBid(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBid,
  getAllBid,
  getBid,
  updateBid,
  deleteBid,
};
