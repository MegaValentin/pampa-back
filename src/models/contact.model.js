import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        match: [/.+\@.+\..+/, "Por favor, ingresa un correo válido."]
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

export default mongoose.model("Contact", contactSchema)