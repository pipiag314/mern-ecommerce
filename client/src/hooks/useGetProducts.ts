import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const useGetProducts = () => {
    const [products, setProducts] = useState()

    const fetchAndSetProducts = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}product/getproducts`);
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