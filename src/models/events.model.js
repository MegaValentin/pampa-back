import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type:String
    },
    date:{
        type: Date,
        require: true
    }
})

export default mongoose.model("Events", eventsSchema)