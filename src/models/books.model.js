import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  coverImage: {
    type: String, 
  },
  pages: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Books", bookSchema);
