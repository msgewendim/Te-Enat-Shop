import SingleCartItem from "./SingleCartItem"
import { useAppContext } from "../../hooks/useAppContext"


const CartItemsList = () => {
  const { cartItems } = useAppContext()

  if (!cartItems.length) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No items in cart.</p>
  }
  return (
    <ul role="list" className=" divide-y flex flex-col justify-between no-scrollbar overflow-y-scroll max-h-[500px] divide-gray-200">
      {
        cartItems && cartItems.map(({ product, quantity, size, price }, index) => {
          return (
            <SingleCartItem key={index} product={product} quantity={quantity} size={size} price={price} />
          )
        })
      }
    </ul>
  )
}

export default CartItemsList