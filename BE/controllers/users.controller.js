const User = require("../models/user.model");

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
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  login,
  updateUserBalance,
  getAdmin,
};
