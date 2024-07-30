const express = require("express");
const router = express.Router();
const {
  createBid,
  deleteBid,
  getAllBid,
  getBid,
  updateBid,
} = require("../controllers/bids.controller");

router.get("/", getAllBid);
router.get("/:id", getBid);
router.post("/", createBid);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);

module.exports = router;
