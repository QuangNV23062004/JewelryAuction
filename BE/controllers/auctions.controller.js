const Auction = require("../models/auction.model");

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

const UpdateAllAuctions = async (req = {}, res) => {
  try {
    const currentTime = new Date();

    // Fetch all auctions that are either "Scheduled" or "Ongoing"
    const auctions = await Auction.find({
      status: { $in: ["Scheduled", "Ongoing"] },
    });
    if (auctions)
      console.log(
        "Fetched all auctions with status 'Scheduled' or 'Ongoing': " +
          auctions.length
      );
    else console.log("No auctions fetched");

    let hasUpdates = false;

    // Iterate through auctions and update statuses as necessary
    const updatedAuctions = await Promise.all(
      auctions.map(async (auction) => {
        let newStatus = null;

        // Update status from "Scheduled" to "Ongoing"
        if (
          auction.status === "Scheduled" &&
          currentTime >= auction.startTime
        ) {
          newStatus = "Ongoing";
          console.log(`Starting auction ${auction._id} at ${currentTime}`);
        }

        // Update status from "Ongoing" to "Completed"
        if (auction.status === "Ongoing" && currentTime >= auction.endTime) {
          newStatus = "Completed";
          console.log(`Ending auction ${auction._id} at ${currentTime}`);
        }

        if (newStatus) {
          hasUpdates = true;
          const updateData = { status: newStatus, ...(req.body || {}) };
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

    // Filter out any null values (if any update fails)
    const nonNullAuctions = updatedAuctions.filter((a) => a !== null);

    if (!hasUpdates) {
      console.log("Nothing to update");
      if (res) {
        return res.status(200).json({ message: "Nothing to update" });
      }
    }

    if (res) {
      res.status(200).json(nonNullAuctions); // Return updated auctions
    }
  } catch (error) {
    console.error("Error occurred during auction status update:", error);
    if (res) {
      res.status(500).json({ message: error.message });
    }
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
