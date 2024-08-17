const mongoose = require("mongoose");

const auctionDetailsSchema = new mongoose.Schema({
  initialValuation: {
    value: Number,
    staffID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  finalValuation: {
    value: Number,
    staffID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    managerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  finalizedPrice: {
    value: Number,
    buyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  intermediateFee: {
    type: Number,
  },
  intermediateFeeRate: {
    type: Number,
  },
});

const jewelrySchema = new mongoose.Schema({
  owner: {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  auctionDetails: auctionDetailsSchema,
  status: {
    type: String,
    enum: [
      "Pending", //User registers the jewelry
      "Preliminary Valuation Requested", //Preliminary valuation and jewelry requested
      "Jewelry Sent", //user confirm they've seen the notification and the jewelry has been sent
      "Jewelry Arrival Confirmed", //staff confirm the jewelry's arrival
      "Final Valuation", //staff set final valuation
      "Final Valuation Rejected", //manager reject the valuation
      "Final Valuation Confirmed", //manager confirm the jewelry's arrival
      "Approved", //user approve the auction of that jewelry after final valuation
      "Rejected", //user reject the auction
      "Scheduled", //put on schedule
      "Auctioned", //jewelry is set to auction
      "Sold", //after auction
    ],
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "Image URL required"],
  },
  category: {
    type: String,
    enum: [
      "Necklace",
      "Ring",
      "Earring",
      "Bracelet",
      "Brooch",
      "Pendant",
      "Anklet",
      "Cufflink",
    ],
    required: true,
  },
  feedback: {
    type: Array,
    required: false,
  },
  statusUpdateDate: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    ValuationStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    AuctionStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    DeliveryStaff: {
      type: String,
      enum: [
        "N/A", // Allow for cases where there's no specific staff assigned
        mongoose.Schema.Types.ObjectId,
      ],
      ref: "User",
    },
  },
});

const Jewelry = mongoose.model("Jewelry", jewelrySchema);
module.exports = Jewelry;
