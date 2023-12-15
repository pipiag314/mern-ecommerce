import express from "express";
import { registerUser, loginUser, verifyToken } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


export {userRouter};