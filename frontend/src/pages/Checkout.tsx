import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-white my-20">
      <div className="container mx-auto px-4">
        <h1 className="sr-only">{t('checkout.pageTitle')}</h1>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <section
            aria-labelledby="checkout-summary-heading"
            className="mb-8 lg:mb-0"
          >
            <h2
              id="checkout-summary-heading"
              className="text-2xl font-semibold text-primary mb-4"
            >
              {t('checkout.summaryTitle')}
            </h2>
            <CheckoutSummary />
          </section>

          <section
            aria-labelledby="checkout-form-heading"
            className="col-span-2"
          >
            <h2
              id="checkout-form-heading"
              className="text-2xl font-semibold text-primary mb-4 "
            >
              {t('checkout.formTitle')}
            </h2>
            <CheckoutForm />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Checkout;