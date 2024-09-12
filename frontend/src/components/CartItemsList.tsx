import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import SingleCartItem from "./SingleCartItem"

const CartItemsList = () => {
  const { cartItems } = useContext(AppContext)
  
  if (!cartItems.length) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No items in cart.</p>
  }
  return (
    <ul className="flex flex-col justify-between divide-y no-scrollbar dark:divide-gray-300 overflow-y-scroll max-h-[500px]">
      {
        cartItems && cartItems.map(({ product, quantity, size }, index) => {
          return (
            <SingleCartItem key={index} product={product} quantity={quantity} size={size} />
          )
        })
      }
    </ul>
  )
}

export default CartItemsList