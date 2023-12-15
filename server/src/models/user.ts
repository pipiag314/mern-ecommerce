import mongoose, { Schema } from "mongoose";
import { ProductModel } from "./product";

export interface UserModelInterface {
    _id?: string;
    username: string;
    password: string;
    money: number;
    purchasedItems: string[];
}

const UserSchema = new Schema<UserModelInterface>({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        default: 3000
    },
    purchasedItems: [
        {
            type: Schema.Types.ObjectId, 
            ref: "product", 
            default: []
        }
    ]
})

export const UserModel = mongoose.model<UserModelInterface>("User", UserSchema);