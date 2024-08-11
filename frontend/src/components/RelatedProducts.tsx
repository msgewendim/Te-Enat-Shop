import { Link } from "react-router-dom"
import arrowLeft from "/arrowLeft.svg"
import arrowRight from "/arrowRight.svg"
import { cookies } from "../utils/data"
import { Product } from "../../../types/product.types"

const RelatedProducts = ({ relatedProducts }: Partial<Product>) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-xl font-bold text-primary text-start my-5">Related Products</h2>
        <div className="flex justify-between items-center gap-4">
          <button className="">
            <img src={arrowLeft} alt="" width={48} />
          </button>
          <div className="grid grid-cols-4 gap-4 mt-3">
            {relatedProducts?.map(({ _id, name }) => (
              <Link to={`/recipes/${_id}`} key={_id} className="flex flex-col gap-4 justify-between items-center">
                <img src={cookies} alt={name} className="object-cover w-48 h-48 rounded-l" />
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