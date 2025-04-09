const mongoose = require("mongoose")

    const profileSchema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // ya jo bhi tera User model ka naam hai
          required: true,
          unique: true
        },
        fullname: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        phone: {
          type: Number,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        avatar: {
          type: String,
          required: true
        }
      });
      
const profileModel = mongoose.model("Profile", profileSchema)
module.exports = profileModel