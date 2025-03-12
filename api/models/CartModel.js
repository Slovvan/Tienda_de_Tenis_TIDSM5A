import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "shoes",
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "shoes",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})

export const CartModel = model("cart",CartSchema)