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
        default: Date.now,
        get: (date) => date.toISOString().split("T")[0]
    },
    status: {
        type: String,
        enum: ["borrador", "listo", "subido"], // Solo permite estos tres valores
        default: "borrador"
    },
    fechaPublicacion: {
        type: Date,
        default: null,
        get: (date) => (date ? date.toISOString().split("T")[0] : null)
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

articleSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate(); 

    if (update && update.status) {
        switch (update.status) {
            case "subido":
                if (!this.get("fechaPublicacion")) {
                    update.fechaPublicacion = new Date(); 
                }
                break;

            case "borrador":
                update.fechaPublicacion = null; 
                break;

            default:
                break;
        }
    }

    next();
});


export default mongoose.model("Article", articleSchema);
