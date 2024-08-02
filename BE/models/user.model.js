const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: Number, // 1 for member (both seller and buyer), 2 for staff, 3 for owner
    required: true,
  },
  status: {
    type: Boolean, // true for active, false for inactive
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
