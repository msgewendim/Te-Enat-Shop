import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import ShopBanner from "/ShopBanner.svg"
import Banner from "../components/Banner"
import { AppContext } from "../providers/interface/context"
import { useContext, useEffect, MouseEvent, useState } from "react"
import { Link } from "react-router-dom"
import { query } from "../providers/interface/context"
import { Product } from "../client"
import Cart from "./Cart"
const Shop = () => {
  const [openCart, setOpenCart] = useState(false)
  const { getProducts, page, setPage, products, cartItems, setProducts, category, filter } = useContext(AppContext)
  const query: query = {
    page,
    category,
    filter,
    limit: 12,
  }
  const handlePagination = async (e: MouseEvent<HTMLAnchorElement>) => {
    const { title } = e.currentTarget
    if (title === "previous") setPage(page === 1 ? page : page - 1)
    else if (title === "next") setPage(page + 1)
    await getProducts()
  }
  useEffect(() => {
    getProducts(query)
      .then(products => {
        if (!products) setPage(0)
        setProducts(products as Product[])
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filter, page])
  useEffect(() => {
    window.addEventListener('reload', () => getProducts(query).then(products => setProducts(products as Product[])), false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  )}, [])
  return (
    <main >
      {/* CART ICON FLOATING */}
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <button onClick={() => setOpenCart(true)} draggable={true} className="fixed right-2 top-16 sm:right-10 sm:top-[50vh] bg-primary rounded-full p-[15px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span className="absolute -top-1 left-7 text-white rounded w-3 h-5 dark:text-white">{cartItems.length}</span>
      </button>
      <Banner image={ShopBanner} text="חנות" />
      <div className="flex flex-col justify-center items-center my-3">
        <Filters />
        <div className="w-[85vw] px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-12">
            {
              products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </div>
        </div>
        <div className="items-center text-xs sm:space-y-0 sm:space-x-3 flex justify-center">
          <div className="flex gap-1 items-center justify-center">
            <Link to={`/products?page=${page}`}
              onClick={(e) => handlePagination(e)}
              title="previous"
              type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </Link>
            <button type="button" title="currentPage" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 dark:text-violet-600 dark:border-violet-600">{page}</button>
            {/* <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 2">{page + 1}</button>*/}
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