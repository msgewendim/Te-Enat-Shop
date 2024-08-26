import { Link } from "react-router-dom"
import arrowLeft from "/arrowLeft.svg"
import arrowRight from "/arrowRight.svg"
import { Product } from "../client/types.gen"
import { useContext, useEffect, useState, MouseEvent } from "react"
import { AppContext } from "../providers/interface/context"

const RelatedProducts = ({ category, }: { category: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loadMoreRelatedProducts, setLoadMoreRelatedProducts] = useState({
    start: 1,
    end: 4,
  })
  const { getProducts } = useContext(AppContext)
  const query = {
    // category: category,
  }
  const handleLoad = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = e.currentTarget
    if (name === "start" && loadMoreRelatedProducts.start > 0) {
      setLoadMoreRelatedProducts({
        start: loadMoreRelatedProducts.start - 1,
        end: loadMoreRelatedProducts.end - 1,
      })
    } else if (name === "end" && relatedProducts.length < loadMoreRelatedProducts.end) {
      setLoadMoreRelatedProducts(() => ({
        end: loadMoreRelatedProducts.end + 1,
        start: loadMoreRelatedProducts.start + 1
      }))
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(query)
      setRelatedProducts(products as Product[])
    }
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])
  return (
    <>
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold text-primary text-start my-5 mx-auto">Related Products</h2>
        <div className="flex justify-between items-center gap-4">
          <button className="" onClick={(e) => handleLoad(e)} name="start">
            <img src={arrowLeft} alt="" width={36} />
          </button>
          <div className="flex gap-4 mt-3">
            {relatedProducts.splice(loadMoreRelatedProducts.start, loadMoreRelatedProducts.end)?.map(({ _id, name, images }) => (
              <Link to={`/products/${_id}`} key={_id} className="flex flex-col gap-4 justify-between items-center">
                <img src={images[0]} alt={name} className="object-cover w-32 h-32 rounded-lg" />
                <h2 className="text-xl ml-2 text-primary capitalize font-semibold">
                  {name}
                </h2>
              </Link>
            ))}
          </div>
          <button className="" onClick={(e) => handleLoad(e)} name="end">
            <img src={arrowRight} alt="" width={36} />
          </button>
        </div>
      </div>
    </>
  )
}

export default RelatedProducts