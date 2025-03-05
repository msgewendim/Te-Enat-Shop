import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { CartItem } from "../../client/types.gen";
import { useAppContext } from "../../hooks/app/useAppContext";
import { removeItemFromCartList } from "../../utils/helperFunctions";

const SingleCartItem = ({ item, quantity, size, price, itemType }: CartItem) => {
  const { t } = useTranslation();
  const { cartItems, setCartItems } = useAppContext();  
  const { name, image, _id } = item;

  const handleRemoveItem = () => {
    const updatedCartItems = removeItemFromCartList(cartItems, { item, quantity, size, price, itemType, name});
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

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
            <Link to={`/products/${_id}/info`}>{name}</Link>
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