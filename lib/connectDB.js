import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("connected");
    } catch (error) {
        console.log("Connection error. ", error);
    }
}