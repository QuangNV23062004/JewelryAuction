const User = require("../models/user.model");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getAllUser = async () => {
  return await User.find();
};

const getUser = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const findByEmailOrUsername = async (email, username) => {
  return await User.findOne({ $or: [{ email }, { username }] });
};

const updateUserBalance = async (accountId, newBalance) => {
  try {
    // Ensure newBalance is a valid positive number
    if (newBalance < 0) {
      return { success: false, message: "Balance cannot be negative" };
    }

    const user = await User.findByIdAndUpdate(
      accountId,
      { $set: { balance: newBalance } },
      { new: true }
    );

    if (!user) {
      console.log("No user found or updated");
      return { success: false, message: "User not found" };
    } else {
      console.log("User balance updated successfully", user);
      return { success: true, message: "Balance updated successfully", user };
    }
  } catch (error) {
    console.log("Error updating balance: " + accountId + ", " + error.message);
    return {
      success: false,
      message: "Error updating balance: " + error.message,
    };
  }
};
const getAdmin = async () => {
  try {
    const admin = await User.findOne({ role: 4 });
    if (!admin) {
      console.log("Admin not found");
    }
    return admin;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  findByEmailOrUsername,
  updateUserBalance,
  getAdmin,
};
