import { useTranslation } from 'react-i18next';

import { useAppContext } from "../../hooks/app/useAppContext";

const CheckoutSummary = () => {
  const { cartItems, totalPrice } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="bg-primary lg:min-h-screen lg:sticky lg:top-0">
      <div className="lg:flex lg:flex-col lg:h-screen">
        <div className="p-4 lg:flex-grow lg:overflow-auto">
          <ul className="space-y-4">
            {cartItems?.map(({ item, quantity, size, price }, index) => {
              const { name, image } = item;
              return (
                <li className="flex items-start gap-4" key={`${name}-${size}-${index}`}>
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