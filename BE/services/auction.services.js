const auctionRepository = require("../repositories/auction.repository");
const { getAllBidWithAuctionId } = require("../repositories/bid.repository");
const { updateJewelryStatus } = require("../repositories/jewelry.repository");
const { createPayment } = require("../repositories/payment.repository");

const createAuction = async (auctionData) => {
  return await auctionRepository.createAuction(auctionData);
};

const getAllAuction = async () => {
  return await auctionRepository.getAllAuction();
};

const getAuction = async (id) => {
  return await auctionRepository.getAuction(id);
};

const updateAuction = async (id, auctionData) => {
  return await auctionRepository.updateAuction(id, auctionData);
};

const deleteAuction = async (id) => {
  return await auctionRepository.deleteAuction(id);
};

// Logic for updating auctions
const updateAllAuctions = async (reqBody) => {
  const currentTime = new Date();
  const auctions = await auctionRepository.getAllScheduledAndOngoingAuctions();

  if (!auctions.length) {
    return { status: 200, message: "No auctions to update." };
  }

  let hasUpdates = false;
  const updatedAuctions = await Promise.all(
    auctions.map(async (auction) => {
      let newStatus = null;
      let highestBid = null;

      if (auction.status === "Scheduled" && currentTime >= auction.startTime) {
        newStatus = "Ongoing";
        await updateJewelryStatus(auction.jewelryID, "Auctioned");
      }

      if (auction.status === "Ongoing" && currentTime >= auction.endTime) {
        const bids = await getAllBidWithAuctionId(auction._id);
        highestBid = bids.length > 0 ? bids[0] : null;
        if (highestBid) {
          newStatus = "Completed";
          await updateJewelryStatus(auction.jewelryID, "Sold");
          await createPayment({
            payerID: highestBid.userID,
            auctionID: auction._id,
            amount: highestBid.bidAmount,
            paymentMethod: "Unprocessed",
            status: "Pending",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        } else {
          newStatus = "Unbidded";
        }
      }

      if (newStatus) {
        hasUpdates = true;
        const updateData = {
          status: newStatus,
          ...(highestBid
            ? { winnerBid: highestBid.bidAmount, winner: highestBid.userID }
            : {}),
          ...(reqBody || {}),
        };

        const updatedAuction = await auctionRepository.updateAuction(
          auction._id,
          updateData
        );
        return updatedAuction || auction;
      }

      return auction;
    })
  );

  return {
    status: 200,
    message: "Auctions updated successfully.",
    updatedAuctions,
  };
};

module.exports = {
  createAuction,
  getAllAuction,
  getAuction,
  updateAuction,
  deleteAuction,
  updateAllAuctions,
};
