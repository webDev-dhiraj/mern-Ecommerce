const express = require("express")
const authUser = require("../middleware/auth")
const  {getProfile,updateProfile, createProfile} = require("../controllers/profileController")
const profileRouter = express.Router()
profileRouter.post('/user',authUser,createProfile)
profileRouter.get('/get',authUser,getProfile)
profileRouter.put('/update',authUser,updateProfile)
module.exports = profileRouter