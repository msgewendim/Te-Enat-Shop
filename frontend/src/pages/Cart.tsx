import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartItemsList from '../components/cart/CartItemsList';
import { useAppContext } from '../hooks/app/useAppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { totalPrice, openCart, setOpenCart, orderItems } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = useCallback(() => setOpenCart(false), [setOpenCart]);

  const handleCheckout = useCallback(() => {
    if (orderItems.length > 0) {
      setIsLoading(true);
      setOpenCart(false);
      navigate('/checkout');
    }
  }, [orderItems, navigate, setOpenCart]);

  // const clearCart = useCallback(() => {
  //   setCartItems([]);
  //   setOrderItems([]);
  //   sessionStorage.removeItem('cartItems');
  // }, [setCartItems, setOrderItems]);

  return (
    <>
      <Transition show={openCart} as={React.Fragment}>
        <Dialog onClose={handleClose} className="relative z-40">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <CartContent
                      totalPrice={totalPrice}
                      handleClose={handleClose}
                      handleCheckout={handleCheckout}
                      isLoading={isLoading}
                    />
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const CartContent = ({ totalPrice, handleClose, handleCheckout, isLoading } : {
  totalPrice: number;
  handleClose: () => void;
  handleCheckout: () => void;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <DialogTitle className="text-lg font-medium text-gray-900">
            {t('cart.title')}
          </DialogTitle>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{t('cart.close')}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8 no-scrollbar overflow-y-auto">
          <CartItemsList />
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>{t('cart.total')}</p>
          <p>₪{totalPrice}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">{t('cart.shippingNote')}</p>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full rounded-md border border-transparent bg-btnColor2 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-hoverBtnColor2 disabled:opacity-50 transition duration-150 ease-in-out"
          >
            {t('cart.checkout')}
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            {t('cart.or')}{' '}
            <button
              type="button"
              className="font-medium text-btnColor2 hover:text-hoverBtnColor2 transition duration-150 ease-in-out"
              onClick={handleClose}
            >
              {t('cart.continueShopping')}
              <span aria-hidden="true"> &larr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
