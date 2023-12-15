import { Request, Response } from "express"
import { ProductModel } from "../models/product";

export const addNewProduct = (req: Request, res: Response) => {
    const {name, description, price, quantity, imgURL } = req.body;
    

}