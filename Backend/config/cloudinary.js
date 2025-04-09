require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    
})
console.log("Cloudinary Connected:", cloudinary.config().cloud_name);
}
module.exports = {cloudinary,connectCloudinary}