import { createContext, useState } from "react";

export interface IProductsContext {
  addToCart: (itemId: string) => void;    
  removeFromCart: (itemId: string) => void;    
  updateCartItemCount: (newAmount: number, itemId: string) => void;    
  getCartItemCount: (itemId: string) => number;
}

const defaultValue: IProductsContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
};

export const ProductsContext = createContext<IProductsContext>(defaultValue);

export const ProductsContextProvider = ({children}: {children: any}) => {
    const [cartItems, setCartItems] = useState<{string: number} | {}>({})

    
    const getCartItemCount = (itemId: string): number => {
      if(itemId in cartItems) {
        return cartItems[itemId];
      }

      return 0
    }
    
    const addToCart = (itemId: string) => {
      if(!cartItems[itemId]) {
        setCartItems(prev => ({...prev, [itemId]: 1}))
      } else {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
      }
    }

    const removeFromCart = (itemId: string) => {
      if(!cartItems[itemId]) return;
      if(cartItems[itemId] === 0) return;
      setCartItems(prev => ({...prev, [itemId]: 0}))
    }

    const updateCartItemCount = (newAmount: number, itemId: string) => {
      setCartItems(prev => ({...prev, [itemId]: newAmount}))
    }
    
    const contextValue: IProductsContext = {
      addToCart,
      removeFromCart,
      updateCartItemCount,
      getCartItemCount,
    };
    
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
