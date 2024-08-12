import { Link } from "react-router-dom"
import { cookies } from "../utils/data"
import { Product } from "../../../types/product.types"

const RelatedProducts = ({ relatedProducts }: Partial<Product>) => {
  // const handleGettingMoreRelatedProducts = (e: HTMLButtonElement) => {
  // TODO: Implement logic to fetch more related products
  // e.preventDefault()

  // // Fetch more related products
  // // Set the new relatedProducts state with the fetched data))
  // }
  return (
    <>
      <div className="flex flex-col justify-center items-start pl-4 ml-4 border-l-2 border-l-gray-200">
        <h2 className="text-2xl font-bold text-primary text-start my-5 mx-auto">Related Products</h2>
        <div className="flex justify-between items-center gap-4">
          <div className="grid grid-rows-auto gap-4 my-3">
            {relatedProducts?.map(({ _id, name }) => (
              <Link to={`/recipes/${_id}`} key={_id} className="flex gap-2 justify-between items-end">
                <img src={cookies} alt={name} className="object-cover w-20 h-20 rounded-xl" />
                <h2 className="text-lg ml-2 text-primary capitalize font-semibold">
                  {name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        <button className="w-fit p-2 text-white bg-primary rounded-lg my-2 mx-auto">
          more
        </button>
      </div>
    </>
  )
}

export default RelatedProducts