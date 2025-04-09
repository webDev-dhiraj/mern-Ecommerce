const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");

const Stripe = require("stripe");
//globle variable..
const currency = "inr";
const deliveryCharges = 10;
// Gatway initialize..
const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
//Placing Orderr COD Method..

 const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, amount, address, paymentMethod } = req.body;

    const paymentStatus = paymentMethod === "COD" ? false : true;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: paymentStatus,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe Method..
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "STRIPE",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivry Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};
//.....verifyStripe.....
const verifyStripe = async (req, res) => {
  const { orderId, success } = req.query; // ✅ GET me query se data milta hai
  console.log("Verify Stripe Query Params:", req.query);

  try {
    if (success === "true") {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res
          .status(400)
          .json({ success: false, message: "Order not found!" });
      }
      console.log("Order Updated:", updatedOrder);

      return res
        .status(200)
        .json({ success: true, message: "Payment successful", updatedOrder });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      return res
        .status(400)
        .json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.log("VerifyStripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using Razorpay Method..
const placeOrderRazorpay = async (req, res) => {};
// Placing orders using Razorpay Method..
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, maessage: error.message });
  }
};
// User Order Data for frontend..
const userOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User_Id:", userId);
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, maessage: error.message });
  }
};

// update order status from Admin Panel..
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log("req.body:", req.body);
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, maessage: error.message });
  }
};
module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  verifyStripe,
};
