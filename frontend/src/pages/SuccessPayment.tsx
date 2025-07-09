import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import DesignProductPopup from "../components/layout/modals/DesignProduct";
import { useCartStore } from '../stores/useCartStore';
 

const ThankYou = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { clearCart } = useCartStore();
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  
  const transactionDetails = {
    orderNumber: searchParams.get('voucher_num') || '-',
    amount: searchParams.get('amount') || '0',
    currency: searchParams.get('currency') || 'ILS',
    customerName: searchParams.get('customer_name') || '',
    paymentMethod: `${searchParams.get('brand_name') || ''} (*${searchParams.get('four_digits') || '****'})`,
    status: searchParams.get('status') || '',
  };
  
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
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t('thankYou.orderInfo', { orderNumber: transactionDetails.orderNumber })}
        </p>

        {/* Transaction Details */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('thankYou.transactionDetails')}
          </h3>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">{t('thankYou.amount')}</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">
                {transactionDetails.amount} {transactionDetails.currency}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">{t('thankYou.paymentMethod')}</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">
                {transactionDetails.paymentMethod}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">{t('thankYou.status')}</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">
                {transactionDetails.status}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="/orders"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            role="button"
          >
            {t('thankYou.trackOrder')}
          </a>
          <a
            href="/"
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