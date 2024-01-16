import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useGetToken } from "../hooks/useGetToken";
import toast from "react-hot-toast";
import { ProductInterface } from "../interface";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;


export interface IProductsContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  itemsCount: any;
  buyItems: () => void;
  userMoney: number;
  userPurchasedItems: ProductInterface[];
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

const defaultValue: IProductsContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  itemsCount: 0,
  buyItems: () => null,
  userMoney: 0,
  userPurchasedItems: [],
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => null,
};

export const ProductsContext = createContext<IProductsContext>(defaultValue);

export const ProductsContextProvider = ({ children }: { children: any }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("user_id") !== null);
  
  const [cartItems, setCartItems] = useState<any>({});

  const [userMoney, setUserMoney] = useState<number>(0);
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);

  const { headers } = useGetToken();

  
  const itemsCount = Object.values(cartItems).reduce((a: any, b: any) => a + b, 0);

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev: any) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev: any) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev: any) => ({ ...prev, [itemId]: 0 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    setCartItems((prev: any) => ({ ...prev, [itemId]: newAmount }));
  };

  const buyItems = async () => {
    const body = {
      userId: localStorage.getItem("user_id"),
      cartItems: cartItems,
    };

    try {
      const res = await axios.post(
        `${BASE_API_URL}product/checkout`,
        body,
        {
          headers,
        }
      );

      if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setCartItems({});
      fetchUserMoney();
      fetchPurchasedItems();
    }
  };

  const fetchUserMoney = async () => {
    const res = await axios.get(
      `${BASE_API_URL}user/money/${localStorage.getItem("user_id")}`,
      {
        headers,
      }
    );
    setUserMoney(res.data.money);
  };

  const fetchPurchasedItems = async () => {
    const res = await axios.get(
      `${BASE_API_URL}user/purchaseditems/${localStorage.getItem(
        "user_id"
      )}`,
      {
        headers,
      }
    );
    setUserPurchasedItems(res.data.purchasedItems);
  };

  useEffect(() => {
    if(isUserLoggedIn) {
      fetchUserMoney();
      fetchPurchasedItems();
    }
  }, [isUserLoggedIn, setIsUserLoggedIn]);

  const contextValue: IProductsContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    itemsCount,
    buyItems,
    userMoney,
    userPurchasedItems,
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
