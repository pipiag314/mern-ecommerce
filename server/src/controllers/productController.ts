import { Request, Response } from "express"
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";

export const addNewProduct = async (req: Request, res: Response) => {
    const {name, description, price, quantity, imgURL } = req.body;

    try {

        if(!name) return res.json({error: "Name is required"})
        if(!description) return res.json({error: "Description is required"})
        if(!price) return res.json({error: "Price is required"})
        if(!quantity) return res.json({error: "Quantity is required"})
        if(!imgURL) return res.json({error: "ImgURL is required"})

        const product = await ProductModel.create({
            name,
            description,
            price,
            quantity,
            imgURL
        })
        await product.save()
        
    } catch (error) {
        console.log(error)
    }

}


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        if(products) {
            return res.json({ products })
        } else {
            return res.sendStatus(500).json({error: "error occured while getting data from database"})
        }
    } catch (error) {
        console.log("Error:", error);        
    }
}


export const checkoutProduct = async (req: Request, res: Response) => {
    const { userId, cartItems } = req.body;

    try {
        const user = await UserModel.findById(userId);
        const productIds = Object.keys(cartItems);
        const products = await ProductModel.find({ _id: { $in: productIds}})
        
        if(!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        
        if(!products) {
            return res.status(400).json({
                error: "Products not found"
            })
        }

        if(productIds.length !== products.length) {
            return res.status(400).json({ error: "getting items incorrectly from database"})
        }

        let itemsTotalPrice = 0;
        
        for(const item in cartItems) {
            const product = products.find((product: { _id: string; }) => String(product._id) === item)
            if(!product) {
                return res.status(400).json({ error: "Getting items incorrectly from database"})
            }
            
            if(product.quantity < cartItems[item]) {
                return res.status(400).json({ error: "Item is out of stock"})
            }
            
            itemsTotalPrice += product.price * cartItems[item];

        }

        if(user.money < itemsTotalPrice) {
            return res.status(400).json({ error: "Not enough money"})
        }

        user.money -= itemsTotalPrice;

        user.purchasedItems.push(...productIds)

        await user.save()

        await ProductModel.updateMany({_id: {$in: productIds}}, {$inc: {quantity: -1}})
        
        res.json({ purchasedItems: user.purchasedItems})

        
    } catch (error) {
        res.status(400).json({error})
        console.log(error)
    }
    
}