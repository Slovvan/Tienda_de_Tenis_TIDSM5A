import { Schema, model } from "mongoose";

const ShoesSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

export const ShoesModel = model("shoes",ShoesSchema)