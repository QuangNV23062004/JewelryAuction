const express = require("express");
const router = express.Router();
const {
  createPayment,
  deletePayment,
  getAllPayments,
  getPayment,
  updatePayment,
} = require("../controllers/payment.controller");

router.get("/", getAllPayments);
router.get("/:id", getPayment);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
