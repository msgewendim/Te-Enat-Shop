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
    const { title } = e.currentTarget
    if (title === "previous") setPage(page === 1 ? page : page - 1)
    else if (title === "next") setPage(page + 1)
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
        <div className="w-[85vw] px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </div>
        </div>
        <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
          <div className="space-x-1">
            <Link to={`/products?page=${page}`}
              onClick={(e) => handlePagination(e)}
              title="previous" 
              type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </Link>
            <Link to={`/products?page=${page}`}
              onClick={(e) => handlePagination(e)}
              title="next" 
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Shop