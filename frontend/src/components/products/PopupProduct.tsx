import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Select from '../ui/Select'
import useAddToCartModal from '../../hooks/app/useAddToCartModal'
import { ProductModalProps } from '../../providers/interface/products.props'


const ProductModal: FC<ProductModalProps> = ({ product, open, setOpen }) => {
  const { t } = useTranslation();

  const { handleAddProductToCart, itemProperties, handleQuantityChange, handleSizeChange, prices, sizes, sizeIdx } = useAddToCartModal({
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:max-h-[600px]">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-full">
                  <div className="sm:flex sm:items-start sm:gap-8 flex-row-reverse">
                    {/* Right side - Image */}
                    <div className="sm:w-1/2">
                      <img src={image} alt={name} className="w-full h-[400px] object-cover rounded-md" />
                    </div>

                    {/* Left side - Content */}
                    <div className="mt-4 sm:w-1/2 sm:mt-0 flex flex-col h-[300px]">
                      {/* Top section - Text content */}
                      <div className="mb-auto">
                        <DialogTitle as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-4">
                          {name}
                        </DialogTitle>
                        <p className="text-base text-gray-600">{shortDescription}</p>
                      </div>

                      {/* Bottom section - Interactive elements */}
                      <div className="space-y-6">
                        <Select
                          items={sizes}
                          value={itemProperties.size}
                          displayKey="sizeName"
                          valueKey="sizeName"
                          placeholder='בחר גודל'
                          onChange={handleSizeChange}
                          type='size'
                          className='w-fit'
                        />
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-2xl font-bold text-[#42855b] order-1">
                            ₪{(prices[sizeIdx] * itemProperties.quantity).toFixed(2)}
                          </span>
                          <SelectQuantity handleChange={handleQuantityChange} quantity={itemProperties.quantity} />
                        </div>

                        <div className="flex gap-4 justify-start mt-auto">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-[#42855b] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#3a7751] transition-colors sm:w-auto"
                            onClick={() => handleAddProductToCart(product)}
                          >
                            {t('buttons.buy')}
                          </button>
                          <Link
                            to={`/products/${_id}/info`}
                            className="inline-flex justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors sm:w-auto"
                          >
                            קרא עוד
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const SelectQuantity = ({ handleChange, quantity }: { handleChange: (value: number) => void, quantity: number }) => {
  return (
    <div className="flex items-center order-2">
      <button
        type='button'
        onClick={() => handleChange(1)}
        className="px-4 py-2 border rounded-r hover:bg-gray-50 transition-colors"
      >
        +
      </button>
      <span className="px-6 py-2 border-t border-b min-w-[50px] text-center">
        {quantity}
      </span>
      <button
        type='button'
        onClick={() => handleChange(-1)}
        className="px-4 py-2 border rounded-l hover:bg-gray-50 transition-colors"
      >
        -
      </button>
    </div>
  )
}
export default ProductModal