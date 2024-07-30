const express = require("express");
const router = express.Router();
const {
  createAuction,
  deleteAuction,
  getAllAuction,
  getAuction,
  updateAuction,
} = require("../controllers/auctions.controller");

router.get("/", getAllAuction);
router.get("/:id", getAuction);
router.post("/", createAuction);
router.put("/:id", updateAuction);
router.delete("/:id", deleteAuction);

module.exports = router;
