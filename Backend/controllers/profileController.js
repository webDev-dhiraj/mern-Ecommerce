const profileModel = require("../models/profile.model");

// CREATE USER PROFILE...
const createProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if profile already exists for this user
    const existingProfile = await profileModel.findOne({ user: userId });
    if (existingProfile) {
      return res.json({ success: false, message: "Profile already exists" });
    }

    const { fullname, email, password, phone, address, avatar } = req.body;

    // Create profile with correct user ID
    const newProfile = await profileModel.create({
      user: userId,
      fullname,
      email,
      password,
      phone,
      address,
      avatar,
    });

    res.json({ success: true, profile: newProfile });
  } catch (error) {
    console.log("Profile creation error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET USER PROFILE...
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await profileModel.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, user: profile });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE USER PROFILE...
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find profile by user field
    const existingProfile = await profileModel.findOne({ user: userId });
    if (!existingProfile) {
      return res.json({ success: false, message: "Profile not found" });
    }

    const { fullname, email, password, phone, address, avatar } = req.body;

    // Update only provided fields
    if (fullname) existingProfile.fullname = fullname;
    if (email) existingProfile.email = email;
    if (password) existingProfile.password = password;
    if (phone) existingProfile.phone = phone;
    if (address) existingProfile.address = address;
    if (avatar) existingProfile.avatar = avatar;

    await existingProfile.save();

    res.json({ success: true, message: "Profile updated successfully", profile: existingProfile });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// exopting...
module.exports = { createProfile, getProfile, updateProfile };
