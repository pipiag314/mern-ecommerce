import { Request, Response } from "express"
import { ProductModel } from "../models/product";

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