const Jewelry = require("../models/jewelry.model");

const createJewelry = async (jewelryData) => {
  return await Jewelry.create(jewelryData);
};

const getAllJewelry = async () => {
  return await Jewelry.find();
};

const getJewelry = async (id) => {
  return await Jewelry.findById(id);
};

const updateJewelry = async (id, updatedData) => {
  return await Jewelry.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteJewelry = async (id) => {
  return await Jewelry.findByIdAndDelete(id);
};

const getJewelryWithAuction = async () => {
  return await Jewelry.aggregate([
    {
      $lookup: {
        from: "auctions",
        localField: "_id",
        foreignField: "jewelryID",
        as: "auctionStatus",
      },
    },
    { $unwind: "$auctionStatus" },
    {
      $lookup: {
        from: "payments",
        localField: "auctionStatus._id",
        foreignField: "auctionID",
        as: "paymentDetails",
      },
    },
    {
      $unwind: {
        path: "$paymentDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $match: { auctionStatus: { $ne: null } } },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        image: 1,
        category: 1,
        status: 1,
        auctionStatus: 1,
        paymentDetails: 1,
      },
    },
  ]);
};

const getJewelryByStatus = async (statuses) => {
  const query = Array.isArray(statuses)
    ? { status: { $in: statuses } }
    : { status: statuses };
  return await Jewelry.find(query);
};

const updateJewelryStatus = async (jew, newStatus) => {
  //repo
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
module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  deleteJewelry,
  getJewelryWithAuction,
  getJewelryByStatus,
  updateJewelryStatus,
};
