const Jewelry = require("../models/jewelry.model");

const createJewelry = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const jewelry = await Jewelry.create(req.body);
    res.status(201).json(jewelry);
  } catch (error) {
    console.error("Error creating jewelry:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.find();
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findByIdAndDelete(req.params.id);
    if (!jewelry) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json({ message: "Jewelry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  deleteJewelry,
};
