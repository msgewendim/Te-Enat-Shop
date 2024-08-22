import { Link } from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Dispatch, SetStateAction, useContext, useState, MouseEvent } from 'react'
import { AppContext } from '../providers/interface/context'
import { CartItem, Product } from '../client'

const PopupProduct = ({ product, open, setOpen }:
  { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, product: Product }) => {
  const [quantity, setQuantity] = useState(1)
  const { images, name, shortDescription, price, _id } = product
  const { cartItems, setCartItems } = useContext(AppContext)
  const handleAddProductToCart = (e: MouseEvent<HTMLButtonElement>, item: CartItem) => {
    e.preventDefault()
    setCartItems([...cartItems, item])
    setOpen(false)
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                  {images && <img src={images[0]} alt={name} className="h-[200px] w-[200px] object-cover rounded-md " />}
                  <div className="flex flex-col gap-2">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {name}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-800">
                        {shortDescription}
                      </p>
                      <div className="flex gap-4 items-center mt-2 text-lg font-bold text-primary">
                        Price: {price}₪
                        {/* quantity */}
                        <div className="flex gap-4 border-slate-800 border rounded-lg p-2 px-4 ">
                          <button onClick={() => setQuantity(quantity - 1)} className="font-medium text-md disabled:cursor-not-allowed" disabled={quantity === 1}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className='font-medium text-md'>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={(e) => handleAddProductToCart(e, { product, quantity })}
                        className="bg-green-900 text-white w-fit p-2 rounded-lg hover:bg-secondary">
                        Add to Cart
                      </button>
                      <Link to={`/products/${_id}/info`} className="bg-blue-950 text-white w-fit p-2 rounded-lg hover:bg-primary">
                        More Info
                      </Link>
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