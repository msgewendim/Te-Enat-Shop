import { useTranslation } from 'react-i18next';

import CheckoutFormData from "./CheckoutFormData";

const CheckoutForm = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 lg:sticky lg:top-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6" id="checkout-form-heading">
        {t('checkout.completeOrder')}
      </h2>
      <CheckoutFormData />
    </div>
  );
}

export default CheckoutForm;