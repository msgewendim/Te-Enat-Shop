import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartItem, Product } from '../../client/types.gen'
import { AppContext } from '../../providers/interface/context'
import { addItemToCartList } from '../../utils/helperFunctions'
import Select from '../ui/Select'

const PopupProduct = ({ product, open, setOpen }:
  { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, product: Product }) => {
  const { cartItems, setCartItems, setOrderItems, orderItems, sizeIdx } = useContext(AppContext)
  const { images, name, shortDescription, pricing, _id } = product
  const sizes: Array<string> = []
  const prices: Array<number> = []
  pricing.forEach(({ price, size }) => {
    sizes.push(size)
    prices.push(price)
  })
  const [productProperties, setProductProperties] = useState({
    quantity: 1,
    size: sizes[sizeIdx],
    price: prices[sizeIdx]
  })
  const handleAddProductToCart = (item: CartItem) => {
    const updatedCartItems = addItemToCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
    setOrderItems([...orderItems, {
      description: item.product.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
      size: item.size,
      currency: "ILS",
      vatType: 1,
    }])
    toast.success("מוצר נוסף לעגלה")
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex sm:min-h-full h-[400px] justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative 
              transform 
              overflow-hidden 
              rounded-lg 
              bg-white 
              text-left 
              shadow-xl 
              transition-all 
              data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
              data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in 
              sm:my-4 sm:max-w-full w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white pb-4 sm:p-6 sm:pb-0 sm:my-4 relative min-h-[370px]">
              <div className="sm:grid flex flex-col justify-end sm:grid-cols-2 sm:text-end sm:items-start w-full">
                {/* image*/}
                <div className="pb-2 sm:px-2 sm:pb-4">
                  {images && <img src={images[0]} alt={name} className="sm:rounded-xl object-cover sm:object-cover sm:h-[300px] sm:w-[300px]" />}
                </div>
                {/* content */}
                <div className="flex flex-col sm:justify-center sm:items-end mr-2 lg:mr-2">
                  <div className="flex flex-col justify-center items-end">
                    <DialogTitle as="h3" className="text-lg font-bold leading-6 text-primary">
                      {name}
                    </DialogTitle>
                    <p dir='rtl' className="text-lg text-right text-gray-800 overflow-clip">
                      {shortDescription}
                    </p>
                    {/* SELECT SIZE OF PRODUCT */}
                    <Select classes='' selectItems={sizes ? sizes : []} item={productProperties.size} />
                  </div>
                  {/* price && quantity & size */}
                  <div className="flex items-baseline sm:justify-center justify-end gap-6 mb-2 sm:mb-8">
                    <div className="text-sm font-semibold text-primary">
                      <span className='text-lg font-bold'>{(prices[sizeIdx] * productProperties.quantity).toFixed(2)}₪
                      </span>
                    </div>
                    <div className="border p-2 rounded-lg">
                      <button onClick={() => setProductProperties((prev) => {
                        return { ...prev, quantity: prev.quantity - 1 }
                      })} className="font-medium text-md disabled:cursor-not-allowed" disabled={productProperties.quantity === 1}>-</button>
                      <input value={productProperties.quantity} onChange={() => productProperties.quantity} className='max-w-[30px] text-center outline-none' />
                      <button onClick={() => setProductProperties((prev) => {
                        return { ...prev, quantity: prev.quantity + 1 }
                      })} className='font-medium text-md'>+</button>
                    </div>
                    {/* Btn-s */}
                    <div className="absolute right-0 -bottom-6 sm:bottom-5 sm:mr-8 mr-2 flex items-center gap-2">
                      <Link to={`/products/${_id}/info`} className="bg-white text-primary w-fit p-2 rounded-lg border-gray-700 border-2">
                        קרא עוד
                      </Link>
                      <button
                        onClick={() => handleAddProductToCart({ product, ...productProperties })}
                        className="bg-[#42855b] text-white w-[100px] py-2 rounded-lg hover:bg-hoverBtnColor2 ">
                        הוסף לעגלה
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PopupProduct