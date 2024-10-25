import { useState } from "react"
import { toast } from "react-toastify"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useGetRandomProducts } from "../../hooks/useProductsData"
import Loader from "../ui/Loader"
import ProductCard from "./ProductCard"
import { randomizeArray } from "../../utils/helperFunctions"

const TopProducts = () => {
  const [page, setPage] = useState<number>(1)
  const isMobile = window.matchMedia('(max-width: 768px)');
  const limit = isMobile.matches ? 1 : 3;
  const { data, isError, isLoading, error } = useGetRandomProducts({
    page: page,
    limit: limit
  })
  const randomizedProducts = randomizeArray(data?.products || []);

  if (isError) toast.error(error.message)
  return (
    <div className="flex flex-col justify-center items-center mb-3 pt-8 bg-[#F9F8F8] pb-10">
      {/* Text - Header */}
      <div className="flex flex-col justify-center items-center gap-2 my-3">
        <h1 className="text-4xl font-bold text-primary capitalize">
          החנות שבנינו עבורכם
        </h1>
        <p dir="rtl" className="font-normal px-10 text-primary text-center max-w-[90%]">
          גלו את המוצרים המובילים שלנו שמשלבים בין איכות לטעם ייחודי. כל מוצר נבחר בקפידה כדי להעניק לכם חוויית בישול טהורה, עשירה ומגוונת.
        </p>
      </div>
      {/* Carousel - Gallery of products */}
      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        {/* <!-- Carousel wrapper --> */}
        <div className="relative my-5 flex justify-center items-center gap-10">
          {/* <!-- Item 1 --> */}
          {
            isLoading ? <Loader /> :
              randomizedProducts.map((product) => (
                <div key={product._id} className="duration-700 ease-in-out" data-carousel-item>
                  <ProductCard product={product} className="" />
                </div>
              ))
          }
        </div>
        {/* <!-- Slider controls --> */}
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1} name="start" type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-secondary_btn dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <IoIosArrowBack />
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button onClick={() => setPage((old) => (data?.totalPages && old < data.totalPages ? old + 1 : old))} disabled={page === data?.totalPages} name="end" type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-secondary_btn dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <IoIosArrowForward />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div >
  )
}

export default TopProducts