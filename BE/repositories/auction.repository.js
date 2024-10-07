const Auction = require("../models/auction.model");
const { getAllBidWithAuctionId } = require("./bid.repository");
const { updateJewelryStatus } = require("./jewelry.repository");
const { createPayment } = require("./payment.repository");
const updateAllAuctions = async () => {
  try {
    const currentTime = new Date();

    // Fetch all auctions that are either "Scheduled" or "Ongoing"
    const auctions = await Auction.find({
      status: { $in: ["Scheduled", "Ongoing"] },
    });

    if (auctions.length === 0) {
      console.log("No auctions fetched with status 'Scheduled' or 'Ongoing'.");
      return { message: "No auctions to update." };
    }

    let hasUpdates = false;

    // Iterate through auctions and update statuses as necessary
    const updatedAuctions = await Promise.all(
      auctions.map(async (auction) => {
        let newStatus = null;
        let highestBid = null; // Initialize highestBid to null

        // Update status from "Scheduled" to "Ongoing"
        if (
          auction.status === "Scheduled" &&
          currentTime >= auction.startTime
        ) {
          newStatus = "Ongoing";
          console.log(`Starting auction ${auction._id} at ${currentTime}`);
          await updateJewelryStatus(auction.jewelryID, "Auctioned");
        }

        // Update status from "Ongoing" to "Completed" or "Unbidded"
        if (auction.status === "Ongoing" && currentTime >= auction.endTime) {
          const bids = await getAllBidWithAuctionId(auction._id);
          highestBid = bids.length > 0 ? bids[0] : null;
          if (highestBid) {
            newStatus = "Completed";
            console.log(`Ending auction ${auction._id} at ${currentTime}`);
            await updateJewelryStatus(auction.jewelryID, "Sold");
            await createPayment({
              payerID: highestBid.userID,
              paymentMethod: "Unprocessed",
              auctionID: auction._id,
              amount: highestBid.bidAmount,
              status: "Pending",
              dueDate: new Date(
                new Date(auction.endTime).getTime() + 1000 * 60 * 60 * 24 * 7
              ), // 7 days after auction ends
              type: "Payment",
            });
          } else {
            newStatus = "Unbidded";
            console.log(
              `Ending auction ${auction._id} as Unbidded at ${currentTime}`
            );
          }
        }

        // If the status has changed, update the auction
        if (newStatus) {
          hasUpdates = true;
          let updateData = {
            status: newStatus,
            ...(highestBid
              ? { winnerBid: highestBid.bidAmount, winner: highestBid.userID }
              : {}),
          };

          const updatedAuction = await Auction.findByIdAndUpdate(
            auction._id,
            updateData,
            { new: true }
          );
          return updatedAuction || auction;
        }

        return auction;
      })
    );

    if (hasUpdates) {
      return { message: "Auctions updated successfully.", updatedAuctions };
    } else {
      return { message: "No auctions were updated.", updatedAuctions };
    }
  } catch (error) {
    console.error("Error occurred during auction status update:", error);
    return { message: "Internal server error." };
  }
};
const createAuction = async (auctionData) => {
  return await Auction.create(auctionData);
};

const getAllAuction = async () => {
  return await Auction.find();
};

const getAuction = async (id) => {
  return await Auction.findById(id);
};

const updateAuction = async (id, auctionData) => {
  return await Auction.findByIdAndUpdate(id, auctionData, { new: true });
};

const deleteAuction = async (id) => {
  return await Auction.findByIdAndDelete(id);
};

const getAllScheduledAndOngoingAuctions = async () => {
  return await Auction.find({
    status: { $in: ["Scheduled", "Ongoing"] },
  });
};

module.exports = {
  createAuction,
  getAllAuction,
  getAuction,
  updateAuction,
  deleteAuction,
  getAllScheduledAndOngoingAuctions,
  updateAllAuctions,
};
