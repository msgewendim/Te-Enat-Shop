import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction, useContext, useState, MouseEvent } from 'react'
import { AppContext } from '../providers/interface/context'
import { CartItem, Product } from '../client'
import SelectSize from './SelectSize'

const PopupProduct = ({ product, open, setOpen }:
  { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, product: Product }) => {
  const { images, name, shortDescription, price, sizes } = product
  const [productProperties, setProductProperties] = useState({
    quantity: 1,
    size: sizes ? sizes[0] : ""
  })
  // const { quantity, size } = productProperties
  const { cartItems, setCartItems, setOrderItems, orderItems } = useContext(AppContext)
  const handleAddProductToCart = (e: MouseEvent<HTMLButtonElement>, item: CartItem) => {
    e.preventDefault()
    setCartItems([...cartItems, item])
    setOrderItems([...orderItems, {
      description: item.product.name,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
      size : item.size,
      currency: "ILS",
      vatType: 1,
    }])
    setOpen(false)
    console.log(cartItems, "cart items after add to cart");
  }
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
              data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in 
              sm:my-4 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:max-w-[50vw] max-w-[90vw] sm:max-h-[60vh] max-h-[90vh] bg-white pb-4 sm:p-6 sm:pb-1 sm:my-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:text-end items-start w-full">
                {/* image*/}
                <div className="pb-2 sm:py-0 sm:px-2 sm:pb-4">
                  {images && <img src={images[0]} alt={name} className="rounded-md sm:rounded-xl h-[240px]" />}
                </div>
                {/* content */}
                <div className="sm:flex flex-col sm:justify-center sm:items-end mr-2 lg:-mr-12 mt-2">
                  <div className="flex flex-col justify-end items-end">
                    <DialogTitle as="h3" className="text-base font-bold leading-6 text-primary">
                      {name}
                    </DialogTitle>
                    <p className="text-sm text-gray-800 max-w-full overflow-clip">
                      {shortDescription}
                    </p>
                    {/* SELECT SIZE OF PRODUCT */}
                    <SelectSize sizes={product.sizes ? product.sizes : []} size={productProperties.size} setSize={(size) => setProductProperties((prev) => {
                      return { ...prev, size : size }
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
                  <div className="mt-6 mb-2 sm:mt-8 relative">
                    {/* <Link to={`/products/${_id}/info`} className="bg-blue-950 text-white w-fit p-2 rounded-lg hover:bg-primary">
                        קרא עוד
                      </Link> */}
                    <button
                      onClick={(e) => handleAddProductToCart(e, {product, ...productProperties})}
                      className="bg-green-900 text-white w-fit p-2 rounded-lg hover:bg-secondary items-center absolute left-32 -bottom-3 sm:-left-48 sm:bottom-0">
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
{/* <select className="flex gap-3 justify-center items-center my-2">
  <div className="w-full">
    <button onClick={() => setSize(size - 100)} className="font-medium text-md disabled:cursor-not-allowed" disabled={size === 100}>-</button>
    <input value={`${size} 'גר`} onChange={() => size} className='max-w-[80px] text-center outline-none' />
    <button onClick={() => setSize(size + 100)} className='font-medium text-md'>+</button>
  </div>
</select> */}