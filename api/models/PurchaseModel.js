import { Schema, model } from "mongoose";

const PurchaseSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "shoes",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    date:{
        type: String,
        required: true
    },
    price: {
        type: Double,
        required: true
    }

})

export const PurchaseModel = model("purchase", PurchaseSchema)