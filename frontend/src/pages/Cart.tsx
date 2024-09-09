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
              <div className="flex flex-col max-w-3xl gap-2 p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 justify-between h-full overflow-y-hidden bg-gray-200 py-6 shadow-xl">
                {/* Title */}
                <div className="px-4 sm:px-6 ">
                  <DialogTitle className="text-center font-bold leading-3 text-3xl text-primary ">
                    Shopping Cart
                  </DialogTitle>
                  {/* <hr className='h-1 bg-teal-800' /> */}
                </div>
                {/* Products */}
                <CartItemsList />

                {/* checkout */}
                <div className="flex items-center justify-between">

                  <div className="flex justify-start space-x-4 mt-4">
                    {/* <button type="button" className="px-6 py-2 border rounded-md dark:border-secondary">Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                    </button> */}
                    <Link
                      to="/checkout"
                      onClick={() => setOpenCart(false)}
                      type="button"
                      className="px-6 py-2 border bg-teal-900 text-white rounded-md dark:bg-secondary dark:text-gray-50 dark:border-primary">
                      <span className="sr-only sm:not-sr-only ">המשך</span> לתשלום
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-xl border p-2 border-teal-500 rounded-lg mb-1 ">₪ {totalPrice}</span>
                    <p className="text-sm dark:text-gray-600 text-left">לא כולל דמי משלוח</p>
                  </div>
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