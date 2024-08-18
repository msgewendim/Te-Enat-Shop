import { Link } from "react-router-dom"
import { cookies } from "../utils/data"
import { Product } from "../../../types/product.types"
import arrowLeft from "/arrowLeft.svg"
import arrowRight from "/arrowRight.svg"

const RelatedProducts = ({ relatedProducts }: Partial<Product>) => {
  // const handleGettingMoreRelatedProducts = (e: HTMLButtonElement) => {
  // TODO: Implement logic to fetch more related products
  // e.preventDefault()

  // // Fetch more related products
  // Set the new relatedProducts state with the fetched data))
  // }
  return (
    <>
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold text-primary text-start my-5 mx-auto">Related Products</h2>
        <div className="flex justify-between items-center gap-4">
          <button className="">
            <img src={arrowLeft} alt="" width={48} />
          </button>
          <div className="grid grid-cols-4 gap-4 mt-3">
            {relatedProducts?.map(({ _id, name }) => (
              <Link to={`/recipes/${_id}`} key={_id} className="flex flex-col gap-4 justify-between items-center">
                <img src={cookies} alt={name} className="object-cover w-32 h-32 rounded-l" />
                <h2 className="text-xl ml-2 text-primary capitalize font-semibold">
                  {name}
                </h2>
              </Link>
            ))}
          </div>
          <button className="">
            <img src={arrowRight} alt="" width={48} />
          </button>
        </div>
      </div>
    </>
  )
}

export default RelatedProducts