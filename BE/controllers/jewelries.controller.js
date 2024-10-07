const jewelryService = require("../services/jewelry.services");

const createJewelry = async (req, res) => {
  try {
    const jewelry = await jewelryService.createJewelry(req.body);
    res.status(201).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllJewelry = async (req, res) => {
  try {
    const jewelry = await jewelryService.getAllJewelry();
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJewelry = async (req, res) => {
  try {
    const jewelry = await jewelryService.getJewelry(req.params.id);
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
    const jewelry = await jewelryService.updateJewelry(req.params.id, req.body);
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
    const result = await jewelryService.deleteJewelry(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Jewelry not found" });
    }
    res.status(200).json({ message: "Jewelry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJewelryWithAuction = async (req, res) => {
  try {
    const jewelryWithAuction = await jewelryService.getJewelryWithAuction();
    res.status(200).json(jewelryWithAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJewelryByStatus = async (req, res) => {
  try {
    const jewelry = await jewelryService.getJewelryByStatus(req.query.status);
    res.status(200).json(jewelry);
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
  getJewelryWithAuction,
  getJewelryByStatus,
};
