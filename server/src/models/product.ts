import mongoose, { Schema } from "mongoose";

interface ProductModelInterface {
    title: string;
    quantity: number;
    price: number;
    description: string;
    _id?: string;
    image: string;
    category: string;
}

const ProductSchema = new Schema<ProductModelInterface>({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Invalid quantity number"]
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Minimum price of the product should be above 1"]
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})

export const ProductModel = mongoose.model<ProductModelInterface>("Product", ProductSchema)