import { useState, MouseEvent } from "react"
import { toast } from "react-toastify"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useGetProducts } from "../../hooks/useProductsData"
import Loader from "../ui/Loader"
import ProductCard from "./ProductCard"

// TODO :
//  reloading more products 
//  infinite loading needed
const TopProducts = () => {
  const [end, setEnd] = useState<number>(3)
  const [start, setStart] = useState<number>(1)
  const { data, isError, isLoading, error } = useGetProducts({
    page: start,
    limit: 3
  })
  const handleLoad = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget
    if (name === "start" && start > 0) {
      setStart(start - 1)
      setEnd(end + 1)
    } else if (name === "end") {
      setStart(start + 1)
      setEnd(end + 1)
    }
  }
  if (isError) toast.error(error.message)
  return (
    <div className="flex flex-col justify-center items-center mb-3 pt-8 bg-[#F9F8F8] pb-10">
      {/* Text - Header */}
      <div className="flex flex-col justify-center items-center gap-2 my-3">
        <h1 className="text-4xl font-bold text-primary capitalize">
          החנות שבנינו עבורכם
        </h1>
        <p dir="rtl" className="font-normal px-10 text-primary text-center w-[50vw]">
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
              data?.map((product) => (
                <div key={product._id} className="duration-700 ease-in-out" data-carousel-item>
                  <ProductCard product={product} className="" />
                </div>
              ))
          }
        </div>
        {/* <!-- Slider controls --> */}
        <button onClick={(e) => handleLoad(e)} name="start" type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-secondary_btn dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <IoIosArrowBack />
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button onClick={(e) => handleLoad(e)} name="end" type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-secondary_btn dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <IoIosArrowForward />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default TopProducts