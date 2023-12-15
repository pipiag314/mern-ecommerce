import express from "express";
import { addNewProduct } from "../controllers/productController";


const productRouter = express.Router();

productRouter.post("/newproduct", addNewProduct)



export default productRouter;