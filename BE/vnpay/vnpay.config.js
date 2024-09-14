// vnpay/vnpay.config.js

require("dotenv").config({ path: "./vnpay/key.env" }); // Specify the path to key.env

const result = require("dotenv").config({ path: "./vnpay/key.env" });
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("Environment variables loaded successfully.");
  console.log("VNP_TMNCODE:", process.env.VNP_TMNCODE);
  console.log("VNP_HASHSECRET:", process.env.VNP_HASHSECRET);
}

module.exports = {
  vnp_TmnCode: process.env.VNP_TMNCODE,
  vnp_HashSecret: process.env.VNP_HASHSECRET,
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  vnp_ReturnUrl: "http://localhost:5000/payment/vnpay_return",
};
