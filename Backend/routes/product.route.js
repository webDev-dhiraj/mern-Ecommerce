const express = require("express");
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/product.controller");
const upload = require("../middleware/multer");
const adminAuth = require("../middleware/admin");

const productRouter = express.Router();
productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove",adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProduct);

module.exports = productRouter;
