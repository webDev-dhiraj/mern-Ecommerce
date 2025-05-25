const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const { connectCloudinary } = require("./config/cloudinary");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const profileRouter = require("./routes/profileRoute");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; // ✅ Define the port here

// Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary();

// Allowed frontend origins (add your frontend domain here)
const allowedOrigins = [
  "http://localhost:5176",
  "https://mern-ecommerce-sfrm.onrender.com",
  "http://localhost:3000",
  "https://mern-ecommerce-3bc1.vercel.app/" // 🔁 Replace with actual frontend URL
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/profile", profileRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start Server
app.listen(port, () => {
  console.log("🚀 Server started on PORT:", port);
});

// ✨ Export app (optional for testing or other purposes)
module.exports = app;
