const Bid = require("../models/bid.model");

const createBid = async (req, res) => {
  try {
    const bid = await Bid.create(req.body);
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createBid2 = async (bidData) => {
  console.log("createBid2");
  try {
    const bid = await Bid.create(bidData);
    return bid;
  } catch (error) {
    throw new Error("Error creating bid: " + error.message);
  }
};
const getAllBidWithAuctionId = async (auctionID) => {
  try {
    const bids = await Bid.find({ auctionID: auctionID }).sort({
      bidAmount: -1,
    });

    if (bids.length === 0) {
      console.log("No bids found with auctionID: " + auctionID);
      return [];
    }

    return bids;
  } catch (error) {
    console.error(
      "Error getting bids for auction: " + auctionID,
      error.message
    );
    throw new Error("Error getting bids: " + error.message); // Properly throw the error
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
const updateAllBidToOutbid = async (auctionID) => {
  console.log("Outbided all bid with id: " + auctionID);
  try {
    await Bid.updateMany(
      { auctionID: auctionID, status: "Winning" },
      { status: "Outbid" }
    );
  } catch (error) {
    console.log("Error updating bids to Outbid: " + err.message);
  }
};
module.exports = {
  createBid,
  createBid2,
  getAllBid,
  getBid,
  updateBid,
  deleteBid,
  updateAllBidToOutbid,
  getAllBidWithAuctionId,
};
