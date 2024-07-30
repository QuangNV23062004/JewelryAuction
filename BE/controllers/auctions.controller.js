const Auction = require("../models/auction.model");

const createAuction = async (req, res) => {
  try {
    const auction = await Auction.create(req.body);
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAuction = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions); // Return the array directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuction,
  getAllAuction,
  getAuction,
  updateAuction,
  deleteAuction,
};
