const { cloudinary } = require("../config/cloudinary");
const productModel = require("../models/product.model");

// function for add products..
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
      console.log("productData", productData)
    const product = new productModel(productData);
    await product.save();
    res.json({success: true, message: productData})
    
  } catch (error) {
    console.log("Error :", error);
    res.json({ success: false, message: error });
  }
};

//function for list products..
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    //console.log(products)
    res.json({success:true, products})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:error.message})
  }
};

//function for remove products..
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message: "Product deleted successfully"})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:error.message})
  }
};
//function for single products..
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    console.log("Received Product ID:", productId)
    const product = await productModel.findById(productId)
    console.log(product)
    res.json({success:true, product})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:error.message})
  }
};
module.exports = { addProduct, listProduct, removeProduct, singleProduct };

