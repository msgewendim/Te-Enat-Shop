import { Dispatch, SetStateAction, useContext } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartItemsList from '../components/CartItemsList'
import { AppContext } from '../providers/interface/context'
import { Link } from 'react-router-dom'

const Cart = ({ openCart, setOpenCart }: { setOpenCart: Dispatch<SetStateAction<boolean>>, openCart: boolean, }) => {
  // const handleCheckout = () => {}
  const { totalPrice } = useContext(AppContext)
  return (
    <Dialog open={openCart} onClose={setOpenCart} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpenCart(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex flex-col gap-2 justify-between h-full p-2 overflow-y-hidden bg-white py-6 shadow-xl">
                {/* Title */}
                <div className="grid-rows-1 px-4 sm:px-6 ">
                  <DialogTitle className="text-center font-bold leading-3 text-3xl text-primary ">
                    Shopping Cart
                  </DialogTitle>
                  {/* <hr className='h-1 bg-teal-800' /> */}
                </div>
                {/* Products */}
                <div className="min-h-[400px] relative mt-6 px-4 sm:px-6">
                  <div className="mt-4 space-y-2">
                    <CartItemsList />
                  </div>
                </div>

                {/* checkout */}
                <div className="flex justify-between items-center mx-4 text-center">
                  <div className="capitalize text-xl font-semibold text-center">
                    total price : {totalPrice}₪
                  </div>
                  <Link
                    onClick={() => setOpenCart(false)}
                    to="/checkout"
                    className="rounded bg-teal-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-teal-800"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div >
    </Dialog >
  )
}

export default Cart