import express from "express";
import { registerUser, loginUser, verifyToken, userMoney, userPurchasedItems } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/money/:userId", verifyToken, userMoney)
userRouter.get("/purchaseditems/:userId", verifyToken, userPurchasedItems)

export {userRouter};