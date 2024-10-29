import CheckoutFormData from "./CheckoutFormData";
import { useAppContext } from "../../hooks/useAppContext";
import { useTranslation } from 'react-i18next';

const CheckoutForm = () => {
  const { paymentFormUrl } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 lg:sticky lg:top-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6" id="checkout-form-heading">
        {t('checkout.completeOrder')}
      </h2>
      {paymentFormUrl ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            src={paymentFormUrl}
            className="absolute top-0 left-0 w-full h-full"
            title={t('checkout.paymentIframeTitle')}
            aria-label={t('checkout.paymentIframeLabel')}
          />
        </div>
      ) : (
        <CheckoutFormData />
      )}
    </div>
  );
}

export default CheckoutForm;