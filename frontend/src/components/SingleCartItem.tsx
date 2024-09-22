import { useContext } from "react"
import { CartItem } from "../client"
import { AppContext } from "../providers/interface/context"
import { removeItemFromCartList } from "../utils/helperFunctions"
import { Link } from "react-router-dom"

const SingleCartItem = ({ product, quantity, size, price }: CartItem) => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const { name, images, _id } = product
  const handleRemoveItem = (item: CartItem) => {
    // console.log(cartItems);
    const updatedCartItems = removeItemFromCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }
  return (

    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={name}
          src={images[0]}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div dir="rtl" className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="font-medium text-xl text-blue-950">
              <Link to={`/products/${_id}/info`}>{name}</Link>
            </h3>
            <p className="text-right">{price} ₪</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{size}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">כמות - {quantity}</p>
          <div className="flex">
            <button onClick={() => handleRemoveItem({ product, quantity, size, price })} type="button" className="font-medium text-red-600 hover:text-red-500">
              הסר
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SingleCartItem