import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import CheckoutForm from "../components/CheckoutForm"
interface OrderData {
  description: string // Document description תיאור מסמך  Required
  type: 320 | 400     // Document type 320 : חשבונית מס / קבלה  // 400  Required
  lang: string        // Primary language  Required
  currency: string    // Primary currency  Required
  vatType: 0 | 1 | 2     // Vat type for that document Required 
  amount: number      // The amount the customer needs to pay
  group: number       // Required only when using 'Digital payments(Grow)' plugin. = 100
  pluginId: string   // Clearence Plugin Id. Required unless you are using Cardcom plugin.
  client: {
    id: string
    name: string
    emails: string[]
    taxId: string
    address: string
    city: string
    zip: string
    country: string
    phone: string
  }     // customer information
  successUrl: string    // customer successfully paid (can be for example a "Thank you for your purchase" notification), if not set - uses the default "Thank you for your purchase" notification, This has to be a secured URL (https)
  failureUrl?: string    // redirect to when the customer payment failed, if not set - uses the default "Purchase failed" notification, This has to be a secured URL (https)
  notifyUrl?: string    // The URL to notify about regarding a successfully paid transaction and after a document has been created, parameters to this endpoint will be given as POST parameters, This has to be a secured URL (https)
  custom?: string        // Set a custom data to pass to notification, success & failed URLs, such as your internal order ID that will be passed back to your system as a parameter
}
type IframePaymentResponse = {
  errorCode: number,   // The state of the response (whether there was an error or everything is OK, 0 means OK).
  url: string  // Payment form URL, use as IFrame or redirect to it wherever you like to show a payment form that the user can pay for the purchase.
}
const token = import.meta.env.token
const pluginId = import.meta.env.pluginId
const Checkout = () => {
  const { cartItems, totalPrice } = useContext(AppContext)
  const requestBody: OrderData = {
    description: "",
    type: 320,
    lang: "he",
    currency: "ILS",
    vatType: 0,
    amount: totalPrice,
    pluginId: pluginId as string,
    group: 100,
    client: {
      id: "123",
      name: "kaku kak",
      emails: ["example@gmail.com"],
      taxId: "12323456",
      address: "street address",
      city: "חולון",
      zip: "5820614",
      country: "IL",
      phone: "972549891981",
    },
    successUrl: "https://te-enat-shop.onrender.com/",
    // failureUrl: "https://api.greeninvoice.co.il/api/v1",
    custom: "12839828392"
  }

  const response: Promise<IframePaymentResponse> = fetch('https://api.greeninvoice.co.il/api/v1/payments/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  }).then(response => response.url).catch((err) => err)
  response
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-teal-600 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          {/* Order Summery */}
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {
                  cartItems?.map(({ product, quantity }, index) => {
                    const { name, images, price, sizes } = product;
                    return (
                      <div className="flex items-start gap-4" key={index}>
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                          <img src={images[0]} className="w-full object-cover" />
                        </div>
                        <div className="w-full">
                          <h3 className="text-base text-white">{name}</h3>
                          <ul className="text-xs text-gray-300 space-y-2 mt-2">
                            <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{sizes ? sizes[0] : ""}</span></li>
                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{quantity}</span></li>
                            <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">{price * quantity}₪</span></li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-teal-900 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">{totalPrice}₪</span></h4>
            </div>
          </div>
        </div>
        {/* Client Info */}
        <CheckoutForm />
      </div>
    </div>
  )
}

export default Checkout;