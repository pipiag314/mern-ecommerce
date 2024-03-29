import { NextFunction, Request, Response } from "express";
import { UserModel, UserModelInterface } from "../models/user";
import { hashPassword } from "../helper";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { ProductModel } from "../models/product";

// Register endpoint
export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        // if there is NOT username entered
        if(!username) {
            return res.json({
                error: "Username is required"
            })
        }

        // if there is NOT password entered
        if(!password) {
            return res.json({
                error: "Password is required"
            })
        }

        // if password is NOT strong enough
        if(password.length < 8) {
            return res.json({
                error: "Password should be at least 8 characters long"
            })
        }
        
        // if username is already exists
        const userExists = await UserModel.findOne({ username });
        if(userExists) {
            return res.json({
                error: "Username is taken, try different username"
            })
        }

        // create user in database
        const hashedPassword = await hashPassword(password);
        const newUser = await UserModel.create({
            username,
            password: hashedPassword, 
        })
        await newUser.save();

        return res.json({
            message: "User succesfully registered"
        })

    } catch(error) {

        res.status(500).json({
            error: error,
        })

    }
}


// Login endpoint
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user: UserModelInterface = await UserModel.findOne({ username });

        if(!username || !password) return res.json({error: "Enter username and password"})
        
        // if there is not such a username
        if(!user) {
            return res.json({
                error: "Username or password is incorrect"
            })
        }

        // if INCORRECT Password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) {
            return res.json({
                error: "Username or password is incorrect",
            })
        }


        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET)
        return res.json({
            token,
            user_id: user._id
        })
                       
    } catch (error) {

        console.log(error)
        
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.sendStatus(401).json({error: "No authorization in headers"})
    } else {
        jwt.verify(authHeader, process.env.JWT_SECRET, {}, (error, user) => {
            if(error) {
                return res.sendStatus(403).json({error: "invalid authorization in headers"})
            }
            // res.json(user)
        })
    }


    next();
}


export const userMoney = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const user = await UserModel.findById(userId)
        if(!user) {
            return res.status(400).json({error: "No User found"})
        }
        return res.json({money: user.money})
    } catch (error) {
        console.log("Error: ", error)
    }
}

export const userPurchasedItems = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const user = await UserModel.findById(userId);
        if(!user) res.status(400).json({error: "User Not Found"})
    
        const products = await ProductModel.find({ _id: { $in: user.purchasedItems}})
        
        res.json({purchasedItems: products})   
    } catch (error) {
        console.log("Error: ", error)        
    }

}