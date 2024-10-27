import { useAppContext } from "../../hooks/useAppContext";
import { useTranslation } from 'react-i18next';

const CheckoutSummary = () => {
  const { cartItems, totalPrice } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="bg-primary sm:h-screen sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
      <div className="relative h-full">
        <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
          <div className="space-y-4">
            {cartItems?.map(({ product, quantity, size, price }, index) => {
              const { name, image } = product;
              return (
                <div className="flex items-start gap-4" key={index}>
                  <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                    <img src={image} alt={name} className="w-full object-cover" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-base font-medium text-gray-100 text-right">{name}</h3>
                    <ul className="text-xs text-gray-300 space-y-2 mt-2">
                      <li className="flex flex-wrap gap-4">{size} <span className="ml-auto">{t('checkout.size')}</span></li>
                      <li className="flex flex-wrap gap-4">{quantity} <span className="ml-auto">{t('checkout.quantity')}</span></li>
                      <li className="flex flex-wrap gap-4">₪{quantity * price}<span className="ml-auto">{t('checkout.total')}</span></li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between text-white items-center w-full bg-teal-950 p-4">
          <p className="text-2xl">₪{totalPrice}</p>
          <p>{t('checkout.grandTotal')}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;