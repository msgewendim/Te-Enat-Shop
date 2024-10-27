import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white my-[60px]">
      <div className="flex flex-col max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Order Summary */}
        <div aria-labelledby="checkout-summary-heading">
          <h2 id="checkout-summary-heading" className="text-xl font-semibold text-primary">
            {t('checkout.summaryTitle')}
          </h2>
          <CheckoutSummary />
        </div>

        {/* Client Info */}
        <div aria-labelledby="checkout-form-heading">
          <h2 id="checkout-form-heading" className="text-xl font-semibold text-primary">
            {t('checkout.formTitle')}
          </h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;