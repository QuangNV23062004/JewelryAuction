const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema({
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  initialValuation: {
    type: Number,
    required: false,
  },
  finalValuation: {
    type: Number,
    required: false,
  },
  finalizedPrice: {
    type: Number,
    required: false,
  },
  intermediateFee: {
    type: Number,
    required: false,
  },
  intermediateFeeRate: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Valuated", "Approved", "Rejected", "Auctioned", "Sold"], // Status options
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
});

const Jewelry =
  mongoose.models.Jewelry || mongoose.model("Jewelry", jewelrySchema);
module.exports = Jewelry;
