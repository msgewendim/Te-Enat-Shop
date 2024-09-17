import { useContext } from "react"
import { CartItem } from "../client"
import { AppContext } from "../providers/interface/context"
import { removeItemFromCartList } from "../utils/helperFunctions"
import { Link } from "react-router-dom"

const SingleCartItem = ({ product, quantity, size }: CartItem) => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const { name, price, images, _id } = product
  const handleRemoveItem = (item: CartItem) => {
    // console.log(cartItems);
    const updatedCartItems = removeItemFromCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }
  return (
    // <li className="flex flex-col py-3 sm:flex-row sm:justify-between">
    //   <div className="flex w-full space-x-2 sm:space-x-4">
    //     {/* Product Image */}
    //     <img
    //       src={images[0]}
    //       alt=""
    //       className="size-20 rounded object-cover"
    //     />
    //     <div className="flex flex-col justify-between w-full pb-2">
    //       <div className="flex justify-between w-full pb-2 space-x-2">
    //         {/* Product Name */}
    //         <div className="space-y-1">
    //           <h3 className="text-lg font-semibold leading-snug sm:pr-8">{name}</h3>
    //           <p className="text-sm dark:text-gray-600">{size}</p>
    //         </div>
    //         <div className="text-right">
    //           <p className="text-lg font-semibold">{price}₪</p>
    //           {/* Product Quantity*/}
    //           <div className="flex flex-1 items-center justify-end gap-2">
    //             <p>Q: {quantity}</p>
    //           </div>
    //           {/* <p className="text-sm line-through dark:text-gray-400">75.50€</p> */}
    //         </div>
    //       </div>
    //       <div className="flex text-sm divide-x">
    //         <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => handleRemoveItem({ product, size, quantity })}>
    //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
    //             <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
    //             <rect width="32" height="200" x="168" y="216"></rect>
    //             <rect width="32" height="200" x="240" y="216"></rect>
    //             <rect width="32" height="200" x="312" y="216"></rect>
    //             <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
    //           </svg>
    //           {/* <span>Remove</span> */}
    //         </button>
    //         <button type="button" className="flex items-center px-2 py-1 space-x-1">
    //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current hover:fill-red-700 focus:bg-red-800">
    //             <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
    //           </svg>
    //           {/* <span>Add to favorites</span> */}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </li>
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={name}
          src={images[0]}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/products/${_id}/info`}>{name}</Link>
            </h3>
            <p className="ml-4">{price}₪</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{size}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button onClick={() => handleRemoveItem({product, quantity, size})} type="button" className="font-medium text-red-600 hover:text-red-500">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SingleCartItem


{/* remove Btn */ }
{/* <button className="text-gray-600 transition hover:text-red-600" >
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
        </button> */}