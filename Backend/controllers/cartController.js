const userModel = require("../models/user.model");

const addToCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { itemId, size, quantity } = req.body;
console.log(" req.body::", req.body)

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! Login required." });
    }
    if (!itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid itemId or size!" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    let cartData = userData.cartData || {};

    console.log(" cartData keys:", Object.keys(cartData));

    if (!cartData[itemId]) {
      console.log(" Item not found in cartData:", itemId);
      cartData[itemId] = {};
    } //else {
    //   let itemData = cartData[itemId];
    //  // itemData.quantity = (itemData.quantity || 0) + quantity;
    // }
    console.log("🛠 Updated cartData:", cartData);
    // Update quantity by size
    let itemData = cartData[itemId];
    itemData[size] = (itemData[size] || 0) + Math.max(quantity || 1, 1);

    console.log(" Updated cartData:", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    return res.json({ success: true, message: "Added to Cart", cartData });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//....updateCart....
const updateCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { itemId, size, quantity } = req.body;
    console.log("req.body:", req.body);
    console.log("userId:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    if (!itemId || !size || isNaN(quantity) || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input!" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    //  Correct size-wise update logic
    if (quantity === 0) {
      if (userData.cartData[itemId]) {
        delete userData.cartData[itemId][size];
        if (Object.keys(userData.cartData[itemId]).length === 0) {
          delete userData.cartData[itemId];
        }
      }
    } else {
      if (!userData.cartData[itemId]) {
        userData.cartData[itemId] = {};
      }
      userData.cartData[itemId][size] = quantity;
    }

    userData.markModified("cartData");
    await userData.save();

    return res.json({
      success: true,
      message: "Cart Updated",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//  Get User Cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    const userData = await userModel.findById(userId).lean();
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { addToCart, updateCart, getUserCart };
