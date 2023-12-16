import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useGetProducts = () => {
    const [products, setProducts] = useState()

    const fetchAndSetProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/product/getproducts`);
            setProducts(response.data.products)
        } catch (error) {
            toast.error("Error Occurred while getting products");            
        }
    }

    useEffect(() => {
        fetchAndSetProducts();
    }, [])

    return products;
    
}