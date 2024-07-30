const Bid = require("../models/bid.model");

const createBid = async (req, res) => {
  try {
    const bid = await Bid.create(req.body);
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllBid = async (req, res) => {
  try {
    const bid = await Bid.find();
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
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
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    const bid = await Bid.findByIdAndDelete(req.params.id);
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
