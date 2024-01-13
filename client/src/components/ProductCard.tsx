import { useContext, useState } from "react";
import { ProductInterface } from "../interface";
import { IProductsContext, ProductsContext } from "../context/productsContext";

type ProductCardProp = {
  product: ProductInterface;
};

const ProductCard: React.FC<ProductCardProp> = ({ product }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { title, description, image, price, quantity, _id } = product;

  const {addToCart, getCartItemCount} = useContext<IProductsContext>(ProductsContext);

  const count = getCartItemCount(_id)

  return (
    <div className="max-w-[300px]  flex justify-between flex-col items-center text-center mx-auto gap-2 p-2">
      <img src={image} className="w-[300px] h-[300px] object-contain" />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>
          {expanded
            ? description
            : description.split(" ").slice(0, 12).join(" ") + "..."}{" "}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600">
            {!expanded ? "more" : "less"}
          </button>{" "}
        </p>
        <p className="font-bold text-xl">${price}</p>
      </div>
      <div className="flex flex-col items-center">
        <button 
          className="border border-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 font-bold text-lg"
          onClick={() => addToCart(_id)}
        >
          Add to Cart {count > 0 && `(${count})`}
        </button>
        {quantity === 0 ? <h2>Out of stock</h2> : <h2>Quantity: {quantity}</h2>}
      </div>
    </div>
  );
};
export default ProductCard;
