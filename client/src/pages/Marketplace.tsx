import ProductCard from "../components/ProductCard";
import { useGetProducts } from "../hooks/useGetProducts"

const Marketplace = () => {

  const products: any = useGetProducts();
  
  return (
    <div className="">
        <h1 className="text-center text-2xl mb-5 font-semibold">Marketplace Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {!products ? <div>Loading...</div>
          : products.map((product: any, index: number) => {
            return (
              <ProductCard key={index} product={product} />
            )
          })}
        </div>
    </div>
  )
}
export default Marketplace