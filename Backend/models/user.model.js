// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
   
//     cartData: {
//       type: Map,
//       of: { 
//         size: { type: String, required: true },
//         quantity: { type: Number, required: true }
//       },
//       default: {}  // Default to an empty object
//     },
//   },
//   { minimize: false }
// )

// const userModel = mongoose.models.user || mongoose.model("User", userSchema);
// module.exports = userModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      
      default: {},
    },
  },
  { minimize: false }  // <-- ye waapas laga de if you want to store empty objects too
);

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
module.exports = userModel;
