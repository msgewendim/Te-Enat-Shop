import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Select from '../ui/Select'
import useAddToCartModal from '../../hooks/useAddToCartModal'
import { ProductModalProps } from '../../providers/interface/products.props'


const ProductModal: FC<ProductModalProps> = ({ product, open, setOpen }) => {
  const { handleAddProductToCart, handleQuantityChange, handleSizeChange, prices, sizes, sizeIdx, productProperties, } = useAddToCartModal({
    product,
    open,
    setOpen
  })
  const { _id, image, name, shortDescription } = product
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={setOpen} className="relative z-10">
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {name}
                      </DialogTitle>
                      <div className="mt-2">
                        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
                        <p className="text-sm text-gray-500 mt-2">{shortDescription}</p>
                      </div>
                      <Select type='size' selectItems={sizes} initialItem={productProperties.size} classes="mt-4" onChange={handleSizeChange} />
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold">{(prices[sizeIdx] * productProperties.quantity).toFixed(2)}₪</span>
                        <div className="flex items-center">
                          <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 border rounded-l">-</button>
                          <span className="px-4 py-1 border-t border-b">{productProperties.quantity}</span>
                          <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 border rounded-r">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#42855b] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3a7751] sm:ml-3 sm:w-auto"
                    onClick={handleAddProductToCart}
                  >
                    הוסף לעגלה
                  </button>
                  <Link
                    to={`/products/${_id}/info`}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    קרא עוד
                  </Link>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProductModal