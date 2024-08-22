import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import SingleCartItem from "./SingleCartItem"

const CartItemsList = () => {
  const { cartItems } = useContext(AppContext)
  
  return (
    <div className="grid">
      <ul className="space-y-4 h-[350px] overflow-y-scroll">
        {
          cartItems && cartItems.map(({ product, quantity }, index) => {
            return (
              <SingleCartItem key={index} product={product} quantity={quantity} />
            )
          })
        }
      </ul>

    </div>
  )
}

export default CartItemsList
  // cartItems.forEach(({ product, quantity }) => {
  //   setTotalPrice(totalPrice + product.price * quantity)
  // })
{/* <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                  <div className=''>
                                    <ul className="flex items-center justify-center g-2">Size: 
                                      {
                                        product.sizes?.map((size, index) => {
                                          return (
                                            <li key={index} className='mx-2 border-2 p-1 rounded checked:bg-primary checked:text-white '>{size}</li>
                                          )
                                        })
                                      }</ul>
                                  </div>  
                                </div> */}


{/* <form>
                                  <label htmlFor="Line1Qty" className="sr-only"> Quantity : {quantity} </label>
                                  <input
                                    type="number"
                                    min="1"
                                    value="1"
                                    id="Line1Qty"
                                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                  />
                                </form> */}