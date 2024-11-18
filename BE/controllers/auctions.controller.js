const auctionService = require("../services/auction.services");

const createAuction = async (req, res) => {
  try {
    const auction = await auctionService.createAuction(req.body);
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//test23
const getAllAuction = async (req, res) => {
  try {
    const auctions = await auctionService.getAllAuction();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuction = async (req, res) => {
  try {
    const auction = await auctionService.getAuction(req.params.id);
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
    const auction = await auctionService.updateAuction(req.params.id, req.body);
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
    const auction = await auctionService.deleteAuction(req.params.id);
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
