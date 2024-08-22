import { useContext, MouseEvent } from "react"
import { Product } from "../client"
import { AppContext } from "../providers/interface/context"

const SingleCartItem = ({ product, quantity }: { product: Product, quantity: number }) => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const handleRemoveItem = (e: MouseEvent<HTMLButtonElement>, item: Product) => {
    e.preventDefault()
    const updatedCartItems = cartItems.filter(({ product }) => product._id !== item._id)
    setCartItems(updatedCartItems)
  }
  return (
    <li className="flex items-center justify-center gap-4">
      {/* Product Image */}
      <img
        src={product.images[0]}
        alt=""
        className="size-16 rounded object-cover"
      />
      {/* Product Name */}
      <div>
        <h3 className="text-sm text-gray-900">{product.name}</h3>
      </div>
      {/* Product Quantity*/}
      <div className="flex flex-1 items-center justify-end gap-2">
        <span>Quantity : {quantity}</span>
      </div>
      {/* remove Btn */}
      <button className="text-gray-600 transition hover:text-red-600" onClick={(e) => handleRemoveItem(e, product)}>
        <span className="sr-only">Remove</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </li>
  )
}

export default SingleCartItem