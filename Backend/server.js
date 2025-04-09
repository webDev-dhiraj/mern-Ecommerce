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
const port = process.env.PORT || 4000;

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// CORS Configuration - Fixing Allowed Origins
const allowedOrigins = [
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:3000",
];

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

// Express JSON Middleware
app.use(express.json());

//  API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/profile",profileRouter)
// Test API Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(" Server started on PORT:", port);
});
