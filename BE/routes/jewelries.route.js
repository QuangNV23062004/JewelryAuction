const express = require("express");
const router = express.Router();
const {
  createJewelry,
  deleteJewelry,
  getAllJewelry,
  getJewelry,
  updateJewelry,
} = require("../controllers/jewelries.controller");

router.get("/", getAllJewelry);
router.get("/:id", getJewelry);
router.post("/", createJewelry);
router.put("/:id", updateJewelry);
router.delete("/:id", deleteJewelry);
// router.get("/owner/:id",getJewelryByOwner);
// router.get("/staff/:id",getJewelryByStaff);
module.exports = router;
