const userModel = require("../models/user.model")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const  jwt = require("jsonwebtoken")


const createToken = (id) => {
   
    // return jwt.sign({id}, process.env.JWT_SECRET)
    const resToken = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d" })
    console.log("resToken:", resToken)
    return resToken
}

//Route for user login...
const loginUser = async(req,res) =>{
try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.json({success: false, message:"user does't exists"})
    }
    const isMatch  = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        const token = createToken(user._id);
        res.json({success:true, token})
    } else {
        res.json({success: false, message: "Invalid credentials"})
    }
} catch (error) {
    console.log("Error", error)
    res.json({success:false, message:"error.message"})
}
}

//Route for user Register...
const registerUser = async(req,res)=>{
try {
    const {name,email,password} = req.body
    //chenging user already exists or not..
    const exists = await userModel.findOne({email})
    if(exists){
        return res.json({success: false, message: "user already exists"})
    }
    // validator email format & strong password..
  if(!validator.isEmail(email)){
    return res.json({success: false, message: "Please enter a valid email"})
  }
  if(password.length < 8){
    return res.json({success: false, message: "Please enter a strong password"})
  }

  // hashing user password...
  const salt =  await bcrypt.genSalt(10)
  const hashedPassword =await bcrypt.hash(password,salt)
  console.log("hashedPassword:", hashedPassword)
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword
  })
  const user  = await newUser.save()
  

  const token = createToken(user._id)
  
  res.json({success:true,token})

} catch (error) {
    console.log("Erro in the try block: ", error)
    res.json({success: false, message: error.message })
}
}
// Route for admin...
const adminLogin = async(req,res) => {
try {
    const {email,password} = req.body
    console.log(email,password)
    if(email ===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email + password,process.env.JWT_SECRET)
        console.log(token)
        res.json({success:true, token})
    } else {
        res.json({success:false, message: "Invalid credentials"})
    }
} catch (error) {
    console.log("Erro in the try block: ", error)
    res.json({success: false, message: error.message })
}
}
module.exports = {loginUser,registerUser,adminLogin}
