import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Package } from '../../client/types.gen'
import { SelectQuantity } from '../products/PopupProduct'
import useAddToCartPackage from '../../hooks/app/useAddToCartPackage'

interface PackageModalProps {
  package: Package
  open: boolean
  setOpen: (open: boolean) => void
}

const PackageModal: FC<PackageModalProps> = ({ package: pkg, open, setOpen }) => {
  const { handleAddPackageToCart, handleQuantityChange, quantity } = useAddToCartPackage({
    package: pkg,
    open,
    setOpen
  })

  const { _id, image, name, price, cookingTime, peoplesQuantity, ingredientsQuantity } = pkg

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={setOpen} className="relative z-10">
        {/* ... TransitionChild for overlay (same as ProductModal) ... */}

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
            // ... same transition properties as ProductModal ...
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:gap-8 flex-row-reverse">
                    {/* Right side - Image */}
                    <div className="sm:w-1/2">
                      <img src={image} alt={name} className="w-full h-[400px] object-cover rounded-md" />
                    </div>

                    {/* Left side - Content */}
                    <div className="mt-3 sm:w-1/2 sm:mt-0 flex flex-col h-[400px]">
                      {/* Top section - Text content */}
                      <div className="mb-auto">
                        <DialogTitle as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-4">
                          {name}
                        </DialogTitle>
                        {/* <p className="text-base text-gray-600 mb-4">{description}</p> */}

                        {/* Package specific info */}
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>זמן הכנה: {cookingTime}</p>
                          <p>מספר סועדים: {peoplesQuantity}</p>
                          <p>מספר מוצרים: {ingredientsQuantity}</p>
                        </div>
                      </div>

                      {/* Bottom section - Interactive elements */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[#42855b] order-1">
                            ₪{(price * quantity).toFixed(2)}
                          </span>
                          <SelectQuantity handleChange={handleQuantityChange} quantity={quantity} />
                        </div>

                        <div className="flex gap-4 justify-end">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-[#42855b] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#3a7751] transition-colors sm:w-auto"
                            onClick={handleAddPackageToCart}
                          >
                            הוסף לעגלה
                          </button>
                          <Link
                            to={`/packages/${_id}/info`}
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

export default PackageModal 