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
    enum: ["Pending", "Valuated", "Approved", "Rejected", "Auctioned", "Sold"],
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
});

const Jewelry = mongoose.model("Jewelry", jewelrySchema);
module.exports = Jewelry;
