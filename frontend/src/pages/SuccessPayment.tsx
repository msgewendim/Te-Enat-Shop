import { useTranslation } from 'react-i18next';
import DesignProductPopup from "../components/layout/modals/DesignProduct";
import { useState, useEffect } from 'react';
import { useAppContext } from "../hooks/app/useAppContext"; 


const ThankYou = () => {
  const { t } = useTranslation();
  const { clearCart } = useAppContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsPopupOpen(true); 
  const handleClosePopup = () => setIsPopupOpen(false);
  
  useEffect(() => {
    clearCart();
    handleOpenPopup();
  }, [clearCart]);

  return (
    <section
      className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16"
      aria-labelledby="thank-you-heading"
    >
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2
          id="thank-you-heading"
          className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2"
          tabIndex={0}
        >
          {t('thankYou.heading')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          {t('thankYou.orderInfo', { orderNumber: '#7564804' })}
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            role="button"
          >
            {t('thankYou.trackOrder')}
          </a>
          <a
            href="#"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            role="button"
          >
            {t('thankYou.returnShopping')}
          </a>
        </div>
      </div>
      <DesignProductPopup isPopupOpen={isPopupOpen} handleClosePopup={handleClosePopup} />
    </section>
  );
};

export default ThankYou;