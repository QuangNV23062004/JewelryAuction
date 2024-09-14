// controllers/vnpay.controller.js

const config = require("../vnpay/vnpay.config.js"); // Make sure to have the config file
const moment = require("moment");
const crypto = require("crypto");
const querystring = require("qs");

// Frontend-friendly payment handler
exports.handlePayment = async (req, res) => {
  const { auctionId, amount } = req.body; // Expect auctionId and amount from frontend

  // Validate input from frontend
  if (!auctionId || !amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid auctionId or amount",
    });
  }

  try {
    // Fetch the payment and admin information
    const yourPayment = await getPaymentByAuctionID(auctionId);
    const admin = await getAdmin();

    if (!yourPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found for the given auctionId",
      });
    }

    if (yourPayment.type === "Payment") {
      if (admin) {
        // Update admin's balance
        await updateUserBalance(admin._id, admin.balance + amount);

        // Update the payment with necessary fields
        await UpdatePaymentByAuctionID(auctionId, {
          paymentMethod: "VNPAY",
          status: "Completed",
          jewelryStatus: "Packaging",
          paytime: new Date(),
          ...yourPayment, // Spread original payment data
        });

        // Respond with success
        return res.status(200).json({
          success: true,
          message: "Payment processed successfully",
          auctionId: auctionId,
          amount: amount,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }
    } else if (yourPayment.type === "Payout" && admin) {
      // Handle payouts (if applicable)
      return res.status(400).json({
        success: false,
        message: "This operation is for a payout, not a payment",
      });
    }
  } catch (error) {
    console.error("Error handling payment: " + error.message);

    // Respond with error details for frontend to display
    return res.status(500).json({
      success: false,
      message: "Internal server error while processing payment",
      error: error.message,
    });
  }
};

// Function to create payment URL
exports.createPaymentUrl = (req, res) => {
  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  const orderId = moment(date).format("DDHHmmss");
  const amount = req.body.amount;
  const bankCode = req.body.bankCode;
  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const tmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  const returnUrl = config.vnp_ReturnUrl;

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: req.body.language || "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Payment for order:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100 * 24545,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  const vnpUrl =
    config.vnp_Url + "?" + querystring.stringify(vnp_Params, { encode: false });
  res.status(200).json({ url: vnpUrl });
};

// Function to handle the return from VNPAY
exports.vnpayReturn = (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    // Handle payment success or failure logic
    if (vnp_Params["vnp_ResponseCode"] === "00") {
      res
        .status(200)
        .json({ message: "Payment successful", details: vnp_Params });
    } else {
      res.status(400).json({ message: "Payment failed", details: vnp_Params });
    }
  } else {
    res.status(400).json({ message: "Invalid checksum", details: vnp_Params });
  }
};

// Utility function to sort object keys
function sortObject(obj) {
  let sorted = {};
  let str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (let i = 0; i < str.length; i++) {
    sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, "+");
  }
  return sorted;
}
