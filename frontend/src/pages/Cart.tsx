import { Dispatch, SetStateAction, useContext } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartItemsList from '../components/cart/CartItemsList'
import { AppContext } from '../providers/interface/context'
import { Link } from 'react-router-dom'

const Cart = ({ openCart, setOpenCart }: { setOpenCart: Dispatch<SetStateAction<boolean>>, openCart: boolean, }) => {
  const { totalPrice } = useContext(AppContext)
  return (
    <Dialog open={openCart} onClose={setOpenCart} className="relative z-30">
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
              <div className="flex flex-col max-w-3xl gap-2 p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 h-full overflow-y-hidden bg-gray-200 py-6 shadow-xl">
                {/* Title */}
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-center font-bold leading-3 text-3xl text-primary ">
                    Shopping Cart
                  </DialogTitle>
                  {/* <hr className='h-1 bg-teal-800' /> */}
                </div>
                {/* Products */}
                <div className="flex justify-between h-full flex-col ">
                  <CartItemsList />
                  {/* checkout */}
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between items-end text-base font-medium text-gray-900">
                      <p>₪ {totalPrice}</p>
                      <p>סה"כ</p>
                    </div>
                    <p className="mt-0.5text-right text-sm text-gray-500">לא כולל דמי משלוח </p>
                    <Link
                      to="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-btnColor2 px-6 py-3 mt-6 text-base font-medium text-white shadow-sm hover:bg-hoverBtnColor2"
                    >
                      לתשלום
                    </Link>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <span aria-hidden="true"> &larr;</span>
                      <button
                        type="button"
                        onClick={() => setOpenCart(false)}
                        className="font-medium text-btnColor2 hover:text-hoverBtnColor2"
                      >
                        המשך בקנייה
                      </button>
                    </div>
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