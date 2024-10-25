import CheckoutFormData from "./CheckoutFormData";
import { useAppContext } from "../../hooks/useAppContext";


const CheckoutForm = () => {
  const { paymentFormUrl } = useAppContext()
  return (
    <div dir="rtl" className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800">השלם את ההזמנה</h2>
      {
        paymentFormUrl ?
          <iframe src={paymentFormUrl} width="100%" height="600px" /> :
          // window.location.href = paymentFormUrl :
          <CheckoutFormData />
      }
    </div>
  )
}

export default CheckoutForm
