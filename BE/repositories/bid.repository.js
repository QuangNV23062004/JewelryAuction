const Bid = require("../models/bid.model");

const createBid = async (bidData) => {
  //repo
  try {
    const bid = await Bid.create(bidData);
    return bid;
  } catch (error) {
    throw new Error("Error creating bid: " + error.message);
  }
};
const getAllBidWithAuctionId = async (auctionID) => {
  //repo
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

const updateAllBidToOutbid = async (auctionID) => {
  //repo
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

const getAllBid = async () => {
  return await Bid.find();
};

const getBid = async (id) => {
  return await Bid.findById(id);
};

const updateBid = async (id, updatedData) => {
  return await Bid.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteBid = async (id) => {
  return await Bid.findByIdAndDelete(id);
};

module.exports = {
  createBid,
  getAllBid,
  getBid,
  updateBid,
  deleteBid,
  updateAllBidToOutbid,
  getAllBidWithAuctionId,
};
