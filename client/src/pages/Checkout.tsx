import { useContext, useState } from "react";
import { ProductsContext } from "../context/productsContext";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductInterface } from "../interface";
import CartItem from "../components/CartItem";
import InformationCard from "../components/InformationCard";

const Checkout = () => {
  const { getCartItemCount, itemsCount } = useContext(ProductsContext);
  const products = useGetProducts();


  let subtotal = 0;
  products?.map((product: any) => {
    subtotal += getCartItemCount(product._id) * product.price;
  });

  console.log(itemsCount)

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full">
      <div className="flex flex-col md:w-[60%] max-md:mb-[200px]">
        <h1>Your Cart Items:</h1>

        {!itemsCount && <InformationCard text="Cart is empty!" />}
        
        <div className="mt-5 flex w-full flex-col gap-5">
          {products?.map((product: ProductInterface) => {
            if (getCartItemCount(product._id) > 0) {
              return <CartItem key={product._id} product={product} />;
            }
          })}
        </div>
      </div>

      {

      }
      <div className="fixed md:h-fit w-[40%] md:mt-11 md:static flex flex-col max-md:bottom-5 max-md:left-[50%] max-md:translate-x-[-50%] max-md:w-[80%] p-5 rounded-2xl shadow-lg bg-[#f2f2f2]">
        <h1>Total Number: &nbsp;&nbsp; {itemsCount}</h1>
        <h1 className="text-2xl font-bold">
          Subtotal: &nbsp;&nbsp; ${subtotal}
        </h1>
        <button className="mt-5 bg-blue-400 hover:bg-blue-500 transition-colors duration-75 px-4 py-2 w-fit self-center rounded-2xl text-white">
          Continue Shopping
        </button>
        <button className="mt-5 bg-blue-400 hover:bg-blue-500 transition-colors duration-75 px-4 py-2 w-fit self-center rounded-2xl text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Checkout;
