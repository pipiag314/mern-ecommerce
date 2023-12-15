import express from "express";
import { addNewProduct, getProducts } from "../controllers/productController";


const productRouter = express.Router();

productRouter.get("/getproducts", getProducts)
productRouter.post("/newproduct", addNewProduct)



export default productRouter;