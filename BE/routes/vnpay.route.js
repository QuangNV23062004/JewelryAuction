// routes/vnpay.route.js

const express = require("express");
const router = express.Router();
const vnpayController = require("../controllers/vnpay.controller");

router.post("/create_payment_url", vnpayController.createPaymentUrl);
router.get("/vnpay_return", vnpayController.vnpayReturn);

module.exports = router;
