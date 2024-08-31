import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import CheckoutForm from "../components/CheckoutForm"

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(AppContext)  
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-teal-600 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          {/* Order Summery */}
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {
                  cartItems?.map(({ product, quantity }, index) => {
                    const { name, images, price, sizes } = product;
                    return (
                      <div className="flex items-start gap-4" key={index}>
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                          <img src={images[0]} className="w-full object-cover" />
                        </div>
                        <div className="w-full">
                          <h3 className="text-base text-white">{name}</h3>
                          <ul className="text-xs text-gray-300 space-y-2 mt-2">
                            <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{sizes ? sizes[0] : ""}</span></li>
                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{quantity}</span></li>
                            <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">{price * quantity}₪</span></li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-teal-900 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">{totalPrice}₪</span></h4>
            </div>
          </div>
        </div>
        {/* Client Info */}
        <CheckoutForm />
      </div>
    </div>
  )
}

export default Checkout;