import mongoose from "mongoose";

const connectDB = async ()=>{
    //when database is connected we will see the below message
    mongoose.connection.on('connected' , () =>console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}

export default connectDB