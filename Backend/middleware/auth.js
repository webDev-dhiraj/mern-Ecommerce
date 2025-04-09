const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.headers.token; 
  if (!token) {
    console.log("Token missing in headers");
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    

    req.user = { userId: token_decode.id }; //  Correct way to get `userId`

    if (!req.user.userId) {
      console.log(" userId missing in decoded token");
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token Data" });
    }

    //console.log("Auth Middleware - User ID:", req.user.userId);

    next();
  } catch (error) {
    console.log(" JWT Verification Error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or Expired Token" });
  }
};

module.exports = authUser;
