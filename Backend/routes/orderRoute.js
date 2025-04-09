const express = require("express");
const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  verifyStripe,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/admin");
const authUser = require("../middleware/auth");
const orderRouter = express.Router();
//Admin Feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
//Payment Feature
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
//User Feature..
orderRouter.post("/userorders", authUser, userOrders);

//Verify Payment....
orderRouter.get("/verifyStripe", authUser, verifyStripe);
module.exports = orderRouter;
