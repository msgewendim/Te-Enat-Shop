
import CheckoutForm from "../components/checkout/CheckoutForm"
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const Checkout = () => {
  return (
    <div className="bg-white my-[60px]">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Order Summery */}
        <CheckoutSummary />
        {/* Client Info */}
        <CheckoutForm />
      </div>
    </div>
  )
}

export default Checkout;