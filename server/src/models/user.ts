import mongoose, { Schema } from "mongoose";

export interface UserModelInterface {
    _id?: string;
    username: string;
    password: string;
    money: number;
    // purchasedItems: string[];
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
    // purchasedItems: 
})

export const UserModel = mongoose.model<UserModelInterface>("User", UserSchema);