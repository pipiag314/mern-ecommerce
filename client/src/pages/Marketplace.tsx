import { useGetProducts } from "../hooks/useGetProducts"

const Marketplace = () => {

  const products = useGetProducts();
  
  return (
    <div className="">
        <h1 className="text-center">Marketplace Page</h1>
        <div>
          {!products && <div>Loading...</div>}
          {products?.map((product: any) => {
            return (
              <div>
                <h1>{product.title}</h1>
                <h2>{product.price}</h2>
                <img src={product.image} />
              </div>
            )
          })}
        </div>
    </div>
  )
}
export default Marketplace