const Auction = require("../models/auction.model");

const { getAllBidWithAuctionId } = require("./bids.controller");
const { updateJewelry2 } = require("./jewelries.controller");
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

// Iterate through auctions and update statuses as necessary
const UpdateAllAuctions = async (req = {}, res) => {
  try {
    const currentTime = new Date();

    // Fetch all auctions that are either "Scheduled" or "Ongoing"
    const auctions = await Auction.find({
      status: { $in: ["Scheduled", "Ongoing"] },
    });

    if (auctions.length === 0) {
      console.log("No auctions fetched with status 'Scheduled' or 'Ongoing'.");
      if (res)
        return res.status(200).json({ message: "No auctions to update." });
      return;
    } else {
      console.log(
        "Fetched all auctions with status 'Scheduled' or 'Ongoing': " +
          auctions.length
      );
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
          await updateJewelry2(auction.jewelryID, "Auctioned");
          console.log("");
        }

        // Update status from "Ongoing" to "Completed" or "Unbidded"
        if (auction.status === "Ongoing" && currentTime >= auction.endTime) {
          const bids = await getAllBidWithAuctionId(auction._id);
          highestBid = bids.length > 0 ? bids[0] : null;
          if (highestBid) {
            newStatus = "Completed";
            console.log(`Ending auction ${auction._id} at ${currentTime}`);
            await updateJewelry2(auction.jewelryID, "Sold");
          } else {
            newStatus = "Unbidded";
            console.log(
              `Ending auction ${auction._id} as Unbidded at ${currentTime}`
            );
          }
        }

        if (newStatus) {
          hasUpdates = true;
          let updateData = null;

          // Prepare update data based on the new status
          if (newStatus === "Completed" && highestBid) {
            // Now, highestBid is defined
            updateData = {
              status: newStatus,
              winnerBid: highestBid.bidAmount,
              winner: highestBid.userID,
              ...(req.body || {}),
            };
          } else {
            updateData = { status: newStatus, ...(req.body || {}) };
          }

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

    // Further logic (if any) can be added here

    if (res && hasUpdates) {
      return res
        .status(200)
        .json({ message: "Auctions updated successfully.", updatedAuctions });
    }
  } catch (error) {
    console.error("Error occurred during auction status update:", error);
    if (res) return res.status(500).json({ message: "Internal server error." });
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
  UpdateAllAuctions,
};
