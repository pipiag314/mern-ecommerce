import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useGetToken } from "../hooks/useGetToken";
import toast from "react-hot-toast";
import { ProductInterface } from "../interface";
import { UserContext } from "./UserContext";
import { useCookies } from "react-cookie";

export interface IProductsContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  itemsCount: number;
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
  const [cookies, _] = useCookies(["token"])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(cookies.token !== null);
  
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const [userMoney, setUserMoney] = useState<number>(0);
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);

  const { headers } = useGetToken();

  
  const itemsCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const buyItems = async () => {
    const body = {
      userId: localStorage.getItem("user_id"),
      cartItems: cartItems,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/product/checkout",
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
      `http://localhost:8000/user/money/${localStorage.getItem("user_id")}`,
      {
        headers,
      }
    );
    setUserMoney(res.data.money);
  };

  const fetchPurchasedItems = async () => {
    const res = await axios.get(
      `http://localhost:8000/user/purchaseditems/${localStorage.getItem(
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
