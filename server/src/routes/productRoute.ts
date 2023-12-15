import express from "express";
import { addNewProduct, getProducts, checkoutProduct } from "../controllers/productController";
import { verifyToken } from "../controllers/user";


const productRouter = express.Router();

productRouter.get("/getproducts", getProducts)
productRouter.post("/newproduct", addNewProduct)
productRouter.post("/checkout", verifyToken, checkoutProduct)


export default productRouter;