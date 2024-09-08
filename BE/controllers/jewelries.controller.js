const Jewelry = require("../models/jewelry.model");
const Auction = require("../models/auction.model");

// Create Jewelry
const createJewelry = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const jewelry = await Jewelry.create(req.body);
    res.status(201).json(jewelry);
  } catch (error) {
    console.error("Error creating jewelry:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Jewelry
const getAllJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.find();
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Jewelry by ID
const getJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Jewelry by ID
const updateJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJewelry2 = async (jew, newStatus) => {
  try {
    const jewelry = await Jewelry.findByIdAndUpdate(
      jew,
      { status: newStatus, ...jew },
      {
        new: true,
      }
    );
    if (!jewelry) {
      console.log("No jewelry found");
      return null;
    }
    return jewelry;
  } catch (error) {
    console.log("Error updating jewelry backend: " + error);
  }
};

// Delete Jewelry by ID
const deleteJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findByIdAndDelete(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json({ message: "Jewelry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJewelryWithAuction = async (req, res) => {
  try {
    const jewelryWithAuction = await Jewelry.aggregate([
      {
        $lookup: {
          from: "auctions", // The name of the auctions collection
          localField: "_id", // Field from Jewelry collection
          foreignField: "jewelryID", // Field from Auction collection
          as: "auctionStatus", // Name of the output array field
        },
      },
      {
        $unwind: "$auctionStatus", // Unwind to flatten the auction data
      },
      {
        $match: {
          auctionStatus: { $ne: null }, // Filter out jewelry without auction data
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          category: 1,
          status: 1,
          owner: 1,
          auctionDetails: 1,
          statusUpdateDate: 1,
          createAt: 1,
          assignedTo: 1,
          "auctionStatus._id": 1,
          "auctionStatus.jewelryID": 1,
          "auctionStatus.startTime": 1,
          "auctionStatus.endTime": 1,
          "auctionStatus.status": 1,
          "auctionStatus.winner": 1,
          "auctionStatus.winnerBid": 1,
          "auctionStatus.currentBid": 1,
        },
      },
    ]);

    if (!jewelryWithAuction || jewelryWithAuction.length === 0) {
      return res
        .status(404)
        .json({ message: "No jewelry with auction data found" });
    }

    res.status(200).json(jewelryWithAuction);
  } catch (error) {
    console.error("Error fetching jewelry with auction data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  deleteJewelry,
  getJewelryWithAuction,
  updateJewelry2,
};
