import { useContext } from "react";
import { ProductInterface } from "../interface";
import { IProductsContext, ProductsContext } from "../context/productsContext";

import { HiOutlineTrash } from "react-icons/hi2"


const CartItem = ({ product }: { product: ProductInterface }) => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const { _id, image, price, title } = product;
  const { getCartItemCount, updateCartItemCount, removeFromCart } =
    useContext<IProductsContext>(ProductsContext);

  const count = getCartItemCount(_id);

  return (
    <div className="w-full shadow-md flex bg-[#f2f2f2] justify-between rounded-lg items-center text-center gap-2 p-4">
      <img
        src={image}
        className="w-[100px] h-[100px] p-1 bg-white object-contain rounded-lg"
      />
      <div className="">
        <h2 className="text-2xl font-bold" title={title}>
          {title.split("").length > 40
            ? `${title.split("").slice(0, 40).join("")}...`
            : title}
        </h2>
        <p className="font-bold text-xl">${price}</p>
      </div>
      <div className="flex gap-4">
        <p className="bg-blue-500 relative rounded-full flex justify-between items-center h-[40px] w-[80px] text-white">
          <span
            onClick={() => updateCartItemCount(count - 1, _id)}
            className="cursor-pointer hover:bg-blue-400 rounded-full w-[30px] h-[40px] overflow-hidden flex justify-center items-center">
            -
          </span>
          {getCartItemCount(_id)}
          <span
            onClick={() => updateCartItemCount(count + 1, _id)}
            className="cursor-pointer hover:bg-blue-400 rounded-full w-[30px] h-[40px] overflow-hidden flex justify-center items-center">
            +
          </span>
        </p>
        <button className="hover:bg-[#e3e3e3] p-2 rounded-full" onClick={() => removeFromCart(_id)}><HiOutlineTrash size={30} /></button>
      </div>
    </div>
  );
};
export default CartItem;
