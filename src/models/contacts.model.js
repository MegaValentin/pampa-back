import mongoose from "mongoose";

const basicContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Por favor, ingresa un correo válido."],
  },
});

export default mongoose.model("BasicContact", basicContactSchema);
