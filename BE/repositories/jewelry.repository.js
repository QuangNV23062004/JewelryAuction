const Jewelry = require("../models/jewelry.model");
const Auction = require("../models/auction.model");
const Payment = require("../models/payment.model");
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
  console.log(query);
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
const getJewelryStaffStatus = async (userId, statuses, type) => {
  let data;
  let query;
  const valuationStatuses = [
    "Pending",
    "Jewelry Sent",
    "Preliminary Valuation Requested",
    "Final Valuation",
    "Final Valuation Confirmed",
    "Final Valuation Rejected",
    "Approved",
    "Rejected",
  ];
  try {
    switch (type.trim()) {
      case "valuation":
        if (statuses === "all") {
          data = await Jewelry.find({
            "assignedTo.ValuationStaff": userId,
            status: { $in: valuationStatuses }, // Ensure it's in a valid valuation status
          });
        } else {
          query = Array.isArray(statuses)
            ? { status: { $in: statuses }, "assignedTo.ValuationStaff": userId }
            : { status: statuses, "assignedTo.ValuationStaff": userId };
          data = await Jewelry.find(query);
        }
        break;

      case "auction":
        if (statuses === "all") {
          data = await getJewelryByAuctionStatus(
            ["Scheduled", "Ongoing"], // Assuming these are all auction statuses
            userId
          );
        } else {
          data = await getJewelryByAuctionStatus(statuses, userId);
        }
        break;
      case "delivery":
        if (statuses === "all") {
          data = await getJewelryByPaymentStatus(
            ["Delivery", "Delivered"], // Assuming these are all delivery statuses
            userId
          );
        } else {
          data = await getJewelryByPaymentStatus(statuses, userId);
        }
        break;
      case "all":
        const allValuationStatuses = await Jewelry.find({
          "assignedTo.ValuationStaff": userId,
          status: { $in: valuationStatuses }, // Ensure it's in a valid valuation status
        });

        const allAuctionStatuses = await getJewelryByAuctionStatus(
          ["Scheduled", "Ongoing"], // Assuming these are all auction statuses
          userId
        );
        const allDeliveryStatuses = await getJewelryByPaymentStatus(
          ["Delivery", "Delivered"], // Assuming these are all delivery statuses
          userId
        );
        // Combine all the results into one dataset
        data = [
          ...allValuationStatuses,
          ...allAuctionStatuses,
          ...allDeliveryStatuses,
        ];
        break;
      default:
        throw new Error("Invalid type specified");
    }
  } catch (error) {
    console.error(`Error fetching jewelry data for ${type} staff:`, error);
    throw error; // Re-throw the error after logging it
  }

  return data;
};

const getJewelryByAuctionStatus = async (auctionStatus, userId) => {
  try {
    // Normalize the auctionStatus input
    const statusArray = Array.isArray(auctionStatus)
      ? auctionStatus
      : [auctionStatus];

    const jewelryWithAuction = await Jewelry.aggregate([
      {
        $lookup: {
          from: "auctions", // The Auctions collection
          localField: "_id",
          foreignField: "jewelryID",
          as: "auctionDetails",
        },
      },
      { $unwind: "$auctionDetails" }, // Flattening the auctionDetails array
      {
        $match: {
          "auctionDetails.status": { $in: statusArray }, // Filter by auction status
          "assignedTo.AuctionStaff": userId, // Filter by assigned auction staff userId
        },
      },
    ]);

    return jewelryWithAuction;
  } catch (error) {
    console.error(
      "Error fetching jewelry by auction status and assigned staff:",
      error
    );
  }
};

// Arrow function to get Jewelry based on Payment Status and assignedTo.DeliveryStaff
const getJewelryByPaymentStatus = async (paymentStatus, userId) => {
  try {
    // Normalize the paymentStatus input
    const statusArray = Array.isArray(paymentStatus)
      ? paymentStatus
      : [paymentStatus];

    const jewelryWithPayment = await Jewelry.aggregate([
      {
        $lookup: {
          from: "payments", // The Payments collection
          localField: "_id",
          foreignField: "auctionID", // Payment links to auctions
          as: "paymentDetails",
        },
      },
      { $unwind: "$paymentDetails" }, // Flattening the paymentDetails array
      {
        $match: {
          "paymentDetails.status": { $in: statusArray }, // Filter by payment status
          "assignedTo.DeliveryStaff": userId, // Filter by assigned delivery staff userId
        },
      },
    ]);

    return jewelryWithPayment;
  } catch (error) {
    console.error(
      "Error fetching jewelry by payment status and assigned delivery staff:",
      error
    );
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
  getJewelryStaffStatus,
};
