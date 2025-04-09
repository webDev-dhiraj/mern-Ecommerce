const express = require("express")
const {loginUser,registerUser,adminLogin,getUserProfile } = require("../controllers/user.controller")
const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
//userRouter.post("/profile", authUser, getUserProfile);
module.exports = userRouter
