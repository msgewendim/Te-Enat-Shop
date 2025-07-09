import { useTranslation } from 'react-i18next';

import SingleCartItem from "./SingleCartItem";
import { useCartStore } from "../../stores/useCartStore";
import { useCartItemsData } from "../../hooks/app/useCartData";
import Loader from "../ui/Loader";

const CartItemsList = () => {
  const { t } = useTranslation();
  const { items: minimalCartItems } = useCartStore();
  const { cartItems, isLoading, isError, errors } = useCartItemsData(minimalCartItems);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-2">
            {t('cart.errorLoadingItems')}
          </p>
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-gray-500">
              {error?.message || t('errors.genericError')}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t('cart.emptyCart')}
        </p>
      </div>
    );
  }

  return (
    <ul
      className="divide-y divide-gray-200 overflow-y-auto max-h-[500px] no-scrollbar"
      aria-label={t('cart.itemsList')}
    >
      {cartItems.map((enrichedItem, index) => (
        <li key={`${enrichedItem.itemId}-${enrichedItem.size}-${index}`} className="py-4">
          <SingleCartItem enrichedItem={enrichedItem} />
        </li>
      ))}
    </ul>
  );
};

export default CartItemsList;