const express = require("express");
const router = express.Router();
const {
  createJewelry,
  deleteJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
  getJewelryWithAuction,
  getJewelryByStatus,
  getJewelryStaffStatus,
} = require("../controllers/jewelries.controller");

// Route to get jewelry with associated auction data
router.get("/with-auction", getJewelryWithAuction);
// Route to get all jewelry

router.get("/by-status", getJewelryByStatus);
router.get("/", getAllJewelry);

router.get("/staff/by-status", getJewelryStaffStatus);
// Route to get a specific piece of jewelry by ID
router.get("/:id", getJewelry);

// Route to create a new piece of jewelry
router.post("/", createJewelry);

// Route to update an existing piece of jewelry by ID
router.put("/:id", updateJewelry);

// Route to delete a piece of jewelry by ID
router.delete("/:id", deleteJewelry);

module.exports = router;
