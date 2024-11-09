import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    content: {
        type: String,
        required: true
    },
    images: [String],
    tags: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    
})

export default mongoose.model("Article", articleSchema) 