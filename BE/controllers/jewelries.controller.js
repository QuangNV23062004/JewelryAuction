const Jewelry = require("../models/jewelry.model");

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
      jew._id,
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
    const jewelryWithAuctionAndPayments = await Jewelry.aggregate([
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
        $lookup: {
          from: "payments", // The name of the payments collection
          localField: "auctionStatus._id", // Auction ID in the auctionStatus field
          foreignField: "auctionID", // Field from Payment collection
          as: "paymentDetails", // Name of the output array field for payments
        },
      },
      {
        $unwind: {
          path: "$paymentDetails", // Unwind paymentDetails to flatten it
          preserveNullAndEmptyArrays: true, // Keep documents without matching payments
        },
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
          "paymentDetails._id": 1, // Payment details
          "paymentDetails.amount": 1,
          "paymentDetails.paymentMethod": 1,
          "paymentDetails.status": 1,
          "paymentDetails.paytime": 1,
          "paymentDetails.dueDate": 1,
        },
      },
    ]);

    if (
      !jewelryWithAuctionAndPayments ||
      jewelryWithAuctionAndPayments.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No jewelry with auction and payment data found" });
    }

    res.status(200).json(jewelryWithAuctionAndPayments);
  } catch (error) {
    console.error(
      "Error fetching jewelry with auction and payment data:",
      error
    );
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
