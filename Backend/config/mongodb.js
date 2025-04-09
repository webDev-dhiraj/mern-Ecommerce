const mongoose = require("mongoose")

const connectDB = async() => {
    mongoose.connection.on("connected", () => {
        console.log("connected DB")
    })
    await mongoose.connect(`${process.env.MONGO_URI}`)
}
module.exports =  connectDB