import CheckoutFormData from "./CheckoutFormData";
import { useAppContext } from "../../hooks/useAppContext";
import { useTranslation } from 'react-i18next';

const CheckoutForm = () => {
  const { paymentFormUrl } = useAppContext();
  const { t } = useTranslation();

  return (
    <div dir="rtl" className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800" id="checkout-form-heading">
        {t('checkout.completeOrder')}
      </h2>
      {
        paymentFormUrl ? (
          <iframe
            src={paymentFormUrl}
            width="100%"
            height="600px"
            title={t('checkout.paymentIframeTitle')}
            aria-label={t('checkout.paymentIframeLabel')}
          />
        ) : (
          <CheckoutFormData />
        )
      }
    </div>
  );
}

export default CheckoutForm;