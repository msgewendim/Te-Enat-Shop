import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import ShopBanner from "/ShopBanner.svg"
import Banner from "../components/Banner"
import { AppContext } from "../providers/interface/context"
import { useContext, useEffect, MouseEvent } from "react"
import { Link } from "react-router-dom"

const Shop = () => {
  const { getProducts, page, setPage, products } = useContext(AppContext)
  const handlePagination = async (e: MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget
    if (id === "prev") setPage(page === 1 ? page : page - 1)
    else if (id === "next") setPage(page + 1)
    await getProducts()
  }
  useEffect(() => {
    if (!products) {
      // setError("No More Found");
      setPage(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])
  return (
    <main >
      <Banner image={ShopBanner} text="Shop" />
      <div className="flex flex-col justify-center items-center my-3">
        <Filters />
        <div className="w-fit grid gap-12 grid-cols-2 mx-auto lg:grid-cols-3 my-10 justify-center items-center ">
          {
            products && products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </div>
        <div className="flex justify-center items-center mb-4 gap-4">
          <Link to={`/products?page=${page}`} onClick={(e) => handlePagination(e)} id="prev" className="bg-primary text-white p-2 w-fit rounded-lg text-center">
            &lt;
          </Link>
          <Link to={`/products?page=${page}`} onClick={(e) => handlePagination(e)} id="next" className="bg-primary text-white p-2 w-fit rounded-lg text-center">
            &gt;
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Shop