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
    category: {
        type: String,
        required: true,
        enum : ["Filosofia", "Musica", "Arte", "Literatura", "Otros"]
    },
    images: [String],
    socialMediaLinks: {
        facebook: String,
        instagram: String,
        twitter: String
    },
    spotifyLink: String,
    youtubeLink: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    isBandOrArtist: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Article", articleSchema) 