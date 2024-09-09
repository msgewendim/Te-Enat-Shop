import { useContext } from "react";
import { AppContext } from "../providers/interface/context";
import CheckoutFormData from "./CheckoutFormData";

const CheckoutForm = () => {
  const { paymentFormUrl } = useContext(AppContext)
  return (
    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
      {
        paymentFormUrl ?
          <iframe src={paymentFormUrl} width="100%" height="600px" /> :
          <CheckoutFormData />
      }
    </div>
  )
}

export default CheckoutForm
