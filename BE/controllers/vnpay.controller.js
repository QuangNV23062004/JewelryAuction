// controllers/vnpay.controller.js

const config = require("../vnpay/vnpay.config.js"); // Make sure to have the config file
const moment = require("moment");
const crypto = require("crypto");
const querystring = require("qs");
let userInformation = null;
const {
  getPaymentByAuctionID,
  UpdatePaymentByAuctionID,
} = require("./payment.controller.js");
const {
  updateUserBalance,
  getAdmin,
} = require("../repositories/user.repository.js");
// Frontend-friendly payment handler

const handlePaymentProcessing = async (auctionId, amount, userInfo) => {
  if (!auctionId || !amount || amount <= 0 || !userInfo) {
    return { success: false, message: "Invalid auctionId or amount" };
  }

  try {
    // Fetch the payment and admin information
    const yourPayment = await getPaymentByAuctionID(auctionId);
    const admin = await getAdmin();

    // Ensure the payment exists
    if (!yourPayment) {
      return {
        success: false,
        message: "Payment not found for the given auctionId",
      };
    }

    // Ensure the admin exists
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }

    if (yourPayment.type === "Payment") {
      // Update admin's balance
      const newBalance = await updateUserBalance(
        admin._id,
        admin.balance + amount
      );
      if (!newBalance) {
        console.log("Failed to update balance");
        return { success: false, message: "Fail to update balance" };
      }

      // Prepare the updated payment data
      const updatedPaymentData = {
        paymentMethod: "VNPAY",
        status: "Completed",
        jewelryStatus: "Packaging",
        paytime: new Date(),
        detail: userInfo,
      };

      // Call UpdatePaymentByAuctionID instead of making a PUT request
      const updatedPayment = await UpdatePaymentByAuctionID(
        auctionId,
        updatedPaymentData
      );
      userInformation = null;
      // Check if the update was successful
      if (updatedPayment) {
        console.log("Payment updated successfully:", updatedPayment);
        return { success: true, message: "Payment processed successfully" };
      } else {
        console.log("Failed to update payment");
        return { success: false, message: "Fail to update payment" };
      }
    } else if (yourPayment.type === "Payout") {
      return {
        success: false,
        message: "This operation is for a payout, not a payment",
      };
    } else {
      return { success: false, message: "Unknown payment type" };
    }
  } catch (error) {
    console.error("Error handling payment:", error.message);
    return {
      success: false,
      message: "Internal server error while processing payment",
    };
  }
};

// Function to create payment URL
exports.createPaymentUrl = (req, res) => {
  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  const orderId = moment(date).format("DDHHmmss");
  const amount = req.body.amount;
  const bankCode = req.body.bankCode;
  const auctionId = req.body.auctionId;
  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  userInformation = req.body.userInfo;
  const tmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  const returnUrl = config.vnp_ReturnUrl;

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: req.body.language || "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: auctionId + orderId,
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

exports.vnpayReturn = async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  // Log VNPay parameters for debugging
  console.log("Received VNPay return parameters:", vnp_Params);

  // Remove secureHash params before processing
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  // Sort the parameters to compare with the signature
  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("Calculated secure hash:", signed);
  console.log("Received secure hash:", secureHash);

  // Validate the checksum
  if (secureHash === signed) {
    console.log("Checksum validation passed.");

    if (vnp_Params["vnp_ResponseCode"] === "00") {
      console.log("VNPay response code is 00, payment successful.");
      try {
        // Extract auction ID and amount from VNPay parameters
        const vnp_TxnRef = vnp_Params["vnp_TxnRef"];
        const auctionId = vnp_TxnRef.slice(0, -8);
        const amount = parseFloat(vnp_Params["vnp_Amount"]) / 100 / 24545; // Adjust for VNPay format

        console.log("Auction ID:", auctionId);
        console.log("Amount:", amount);

        // Call the handlePaymentProcessing function
        const paymentResult = await handlePaymentProcessing(
          auctionId,
          amount,
          userInformation
        );
        console.log(paymentResult);
        if (paymentResult.success) {
          console.log("Payment processing successful:", paymentResult.message);
          // Redirect to the success page
          return res.redirect("http://localhost:5173/success");
        } else {
          console.log("Payment processing failed:", paymentResult.message);
          // Redirect to the failProcess page
          return res.redirect("http://localhost:5173/failProcess");
        }
      } catch (error) {
        console.error("Error processing payment:", error.message);
        // Redirect to the generic fail page in case of an error
        return res.redirect("http://localhost:5173/fail");
      }
    } else {
      // Payment failed
      console.log("VNPay response code is not 00, payment failed.");
      // Redirect to the fail page
      return res.redirect("http://localhost:5173/fail");
    }
  } else {
    // Invalid checksum
    console.log("Checksum validation failed.");
    // Redirect to the fail page
    return res.redirect("http://localhost:5173/fail");
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
