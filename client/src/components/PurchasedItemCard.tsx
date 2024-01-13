import { useState, useContext } from "react";
import { ProductInterface } from "../interface"
import { IProductsContext, ProductsContext } from "../context/productsContext";


type PurchasedItemCardProp = {
    product: ProductInterface;
}

const PurchasedItemCard: React.FC<PurchasedItemCardProp> = ({product}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
  
    const { title, description, image, price, _id } = product;
  
    const {addToCart, getCartItemCount} = useContext<IProductsContext>(ProductsContext);
  
    const count = getCartItemCount(_id);
  
    return (
      <div className="max-w-[300px]  flex justify-between flex-col items-center text-center mx-auto gap-2 p-2">
        <img src={image} className="w-[150px] h-[150px] object-contain" />
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="font-bold text-xl">${price}</p>
        </div>
        <div className="flex flex-col items-center">
        <button 
          className="border border-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 font-bold text-lg"
          onClick={() => addToCart(_id)}
        >
          Purchase Again {count > 0 && `(${count})`}
        </button>
      </div>
      </div>
    );
}
export default PurchasedItemCard
