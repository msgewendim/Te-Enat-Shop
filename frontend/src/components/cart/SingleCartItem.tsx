import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { Product, Package } from "../../client/types.gen";
import { useCartStore } from "../../stores/useCartStore";
import Loader from "../ui/Loader";

interface EnrichedCartItem {
  itemId: string;
  quantity: number;
  size: string;
  price: number;
  itemType: 'Product' | 'Package';
  item: Product | Package | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

interface SingleCartItemProps {
  enrichedItem: EnrichedCartItem;
}

const SingleCartItem = ({ enrichedItem }: SingleCartItemProps) => {
  const { t } = useTranslation();
  const { removeFromCart, updateQuantity } = useCartStore();
  
  const { itemId, quantity, size, price, itemType, item, isLoading, isError } = enrichedItem;

  const handleRemoveItem = () => {
    removeFromCart(itemId, size);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size);
    } else {
      updateQuantity(itemId, size, newQuantity);
    }
  };

  // Show loading state for individual item
  if (isLoading) {
    return (
      <div className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
          <Loader />
        </div>
        <div className="mr-4 flex flex-1 flex-col justify-center" dir="rtl">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state or fallback for individual item
  if (isError || !item) {
    return (
      <div className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs">?</span>
        </div>
        <div className="mr-4 flex flex-1 flex-col" dir="rtl">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="font-medium text-xl text-red-600">
              {t('cart.itemNotFound')}
            </h3>
            <p className="text-right">{price} ₪</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('cart.size')}: {size}</p>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">{t('cart.quantity')}: {quantity}</p>
            <button
              onClick={handleRemoveItem}
              type="button"
              className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline"
              aria-label={t('cart.removeItem', { name: 'item' })}
            >
              {t('cart.remove')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { name, image, _id } = item;
  const linkPath = itemType === 'Product' ? `/products/${_id}` : `/packages/${_id}`;

  return (
    <div className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mr-4 flex flex-1 flex-col" dir="rtl">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className="font-medium text-xl text-blue-950">
            <Link to={linkPath}>{name}</Link>
          </h3>
          <p className="text-right">{price} ₪</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{t('cart.size')}: {size}</p>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label={t('cart.decreaseQuantity')}
            >
              -
            </button>
            <span className="text-gray-500">{t('cart.quantity')}: {quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label={t('cart.increaseQuantity')}
            >
              +
            </button>
          </div>
          <button
            onClick={handleRemoveItem}
            type="button"
            className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline"
            aria-label={t('cart.removeItem', { name })}
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCartItem;