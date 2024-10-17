import mongoose from "mongoose";

const urlDB = "mongodb://localhost:27017/pampadb"

const connectDB = async () => {
    try {
        await mongoose.connect(urlDB)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB
