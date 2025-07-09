import { useTranslation } from 'react-i18next';

import { useCartStore } from "../../stores/useCartStore";
import { useCartItemsData, useCartTotals } from "../../hooks/app/useCartData";
import Loader from "../ui/Loader";

const CheckoutSummary = () => {
  const { items: minimalCartItems } = useCartStore();
  const { cartItems, isLoading, isError, errors } = useCartItemsData(minimalCartItems);
  const { totalPrice } = useCartTotals(minimalCartItems);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="bg-primary lg:min-h-screen lg:sticky lg:top-0">
        <div className="lg:flex lg:flex-col lg:h-screen">
          <div className="p-4 lg:flex-grow lg:overflow-auto flex items-center justify-center">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-primary lg:min-h-screen lg:sticky lg:top-0">
        <div className="lg:flex lg:flex-col lg:h-screen">
          <div className="p-4 lg:flex-grow lg:overflow-auto">
            <div className="text-center text-white">
              <p className="text-red-300 mb-2">{t('cart.errorLoadingItems')}</p>
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-gray-300">
                  {error?.message || t('errors.genericError')}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary lg:min-h-screen lg:sticky lg:top-0">
      <div className="lg:flex lg:flex-col lg:h-screen">
        <div className="p-4 lg:flex-grow lg:overflow-auto">
          <ul className="space-y-4">
            {cartItems?.map((enrichedItem, index) => {
              const { itemId, quantity, size, price, item } = enrichedItem;
              
              // Show loading state for individual items
              if (enrichedItem.isLoading) {
                return (
                  <li key={`${itemId}-${size}-${index}`} className="flex items-start gap-4">
                    <div className="w-24 h-24 lg:w-32 lg:h-28 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <div className="w-full h-full bg-gray-400 animate-pulse rounded"></div>
                    </div>
                    <div className="flex-grow">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                      </div>
                    </div>
                  </li>
                );
              }

              // Show error state or use fallback data
              if (enrichedItem.isError || !item) {
                return (
                  <li key={`${itemId}-${size}-${index}`} className="flex items-start gap-4">
                    <div className="w-24 h-24 lg:w-32 lg:h-28 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <div className="w-full h-full bg-gray-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs">?</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-base font-medium text-red-300 text-right">
                        {t('cart.itemNotFound')}
                      </h3>
                      <dl className="text-xs text-gray-300 space-y-2 mt-2">
                        <div className="flex justify-between">
                          <dt>{t('checkout.size')}</dt>
                          <dd>{size}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>{t('checkout.quantity')}</dt>
                          <dd>{quantity}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>{t('checkout.total')}</dt>
                          <dd>₪{quantity * price}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                );
              }

              const { name, image } = item;
              return (
                <li className="flex items-start gap-4" key={`${itemId}-${size}-${index}`}>
                  <div className="w-24 h-24 lg:w-32 lg:h-28 flex p-3 shrink-0 bg-gray-300 rounded-md">
                    <img src={image} alt="" className="w-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-gray-100 text-right">{name}</h3>
                    <dl className="text-xs text-gray-300 space-y-2 mt-2">
                      <div className="flex justify-between">
                        <dt>{t('checkout.size')}</dt>
                        <dd>{size}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>{t('checkout.quantity')}</dt>
                        <dd>{quantity}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>{t('checkout.total')}</dt>
                        <dd>₪{quantity * price}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between text-white items-center w-full bg-teal-950 p-4">
          <p>{t('checkout.grandTotal')}</p>
          <p className="text-2xl">₪{totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;