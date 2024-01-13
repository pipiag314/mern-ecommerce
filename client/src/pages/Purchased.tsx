import { useContext } from "react";
import { IProductsContext, ProductsContext } from "../context/productsContext";
import PurchasedItemCard from "../components/PurchasedItemCard";

const Purchased = () => {
  const { userPurchasedItems } = useContext<IProductsContext>(ProductsContext);

  return (
    <div>
      <h1 className="text-center text-2xl mb-5 font-semibold">Purchased Items: </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {userPurchasedItems.map((item) => (
          <PurchasedItemCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};
export default Purchased;
