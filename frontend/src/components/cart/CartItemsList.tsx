import { useTranslation } from 'react-i18next';
import SingleCartItem from "./SingleCartItem";
import { useAppContext } from "../../hooks/app/useAppContext";

const CartItemsList = () => {
  const { t } = useTranslation();
  const { cartItems } = useAppContext();

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
      {cartItems.map((item, index) => (
        <li key={`${item.item._id}-${item.size}-${index}`} className="py-4">
          <SingleCartItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default CartItemsList;