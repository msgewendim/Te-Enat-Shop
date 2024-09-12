import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction, useContext, useState, MouseEvent } from 'react'
import { AppContext } from '../providers/interface/context'
import { CartItem, Product } from '../client'
import Select from './Select'
import { Link } from 'react-router-dom'

const PopupProduct = ({ product, open, setOpen }:
  { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, product: Product }) => {
  const { images, name, shortDescription, price, sizes, _id } = product
  const [productProperties, setProductProperties] = useState({
    quantity: 1,
    size: sizes ? sizes[0] : ""
  })
  const { cartItems, setCartItems, setOrderItems, orderItems } = useContext(AppContext)
  const handleAddProductToCart = (e: MouseEvent<HTMLButtonElement>, item: CartItem) => {
    e.preventDefault()
    setCartItems([...cartItems, item])
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    setOrderItems([...orderItems, {
      description: item.product.name,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
      size: item.size,
      currency: "ILS",
      vatType: 1,
    }])
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
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
              sm:my-4 sm:max-w-2xl max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white pb-4 sm:p-6 sm:pb-1 sm:my-4 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:text-end items-start w-full">
                {/* image*/}
                <div className="pb-2 sm:py-0 sm:px-2 sm:pb-4">
                  {images && <img src={images[0]} alt={name} className="rounded-md sm:rounded-xl h-[240px]" />}
                </div>
                {/* content */}
                <div className="flex flex-col sm:justify-center sm:items-end mr-2 lg:mr-2 mt-2">
                  <div className="flex flex-col justify-center items-end">
                    <DialogTitle as="h3" className="text-base font-bold leading-6 text-primary">
                      {name}
                    </DialogTitle>
                    <p dir='rtl' className="text-sm text-right text-gray-800 overflow-clip">
                      {shortDescription}
                    </p>
                    {/* SELECT SIZE OF PRODUCT */}
                    <Select classes='' selectItems={product.sizes ? product.sizes : []} item={productProperties.size} handleClick={(size) => setProductProperties((prev) => {
                      return { ...prev, size: size }
                    })} />
                  </div>
                  {/* price && quantity & size */}
                  <div className="flex items-center sm:justify-center justify-end gap-6 mb-4 sm:mb-8">
                    <span className="text-sm font-semibold text-primary">Price : <span className='text-lg font-bold'>{(price * productProperties.quantity).toFixed(2)}₪</span></span>
                    <div className="border p-2 rounded-lg">
                      <button onClick={() => setProductProperties((prev) => {
                        return { ...prev, quantity: prev.quantity - 1 }
                      })} className="font-medium text-md disabled:cursor-not-allowed" disabled={productProperties.quantity === 1}>-</button>
                      <input value={productProperties.quantity} onChange={() => productProperties.quantity} className='max-w-[30px] text-center outline-none' />
                      <button onClick={() => setProductProperties((prev) => {
                        return { ...prev, quantity: prev.quantity + 1 }
                      })} className='font-medium text-md'>+</button>
                    </div>
                  </div>
                  {/* Btn-s */}
                  <div className="absolute right-0 bottom-2 sm:bottom-5 mr-8 flex items-center gap-2">
                    <Link to={`/products/${_id}/info`} className="bg-primary text-white w-fit p-2 rounded-lg hover:bg-primary">
                      קרא עוד
                    </Link>
                    <button
                      onClick={(e) => handleAddProductToCart(e, { product, ...productProperties })}
                      className="bg-btnColor2 text-white w-[100px] py-2 rounded-lg hover:bg-hoverBtnColor2 ">
                      הוסף לעגלה
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PopupProduct