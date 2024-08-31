import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/interface/context";
import { ClientDetails } from "../client/types.gen";

const CheckoutForm = () => {
  const { totalPrice, orderItems, getPaymentForm, paymentFormUrl } = useContext(AppContext)
  const [clientData, setClientData] = useState<ClientDetails>({
    name: "",
    emails: [],
    mobile: "",
    address: "",
    city: "",
    zip: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const clientDetails: ClientDetails = {
      name: formData.get("name") as string,
      emails: [formData.get("email") as string],
      mobile: "+972-54-1234567",
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
      // taxId: "332459841",
    }
    setClientData(clientDetails)
  }
  const validateClientDataForm = () => {
    const name = clientData.name.trim()
    const emails = clientData.emails.map((email) => email.trim())
    const address = clientData.address.trim()
    const city = clientData.city.trim()
    const zip = clientData.zip.trim()
    if (!name || !emails.length || !address || !city || !zip) {
      // alert("Please fill out all required fields")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emails[0])) {
      // alert("Please enter a valid email address")
      return false
    }
    return true
  }
  useEffect(() => {
    validateClientDataForm()
    getPaymentForm(clientData, totalPrice, orderItems) 
    window.location.replace(paymentFormUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData, orderItems]); 

  return (
    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
      <form className="mt-8" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input type="text" placeholder="FullName" name="name"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            {/* <div>
              <input type="text" placeholder="Last Name"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div> */}
            <div>
              <input type="email" placeholder="Email" name="email"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="tel" placeholder="Phone No." max="10" name="mobile"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
          </div>
        </div>
        {/* Shipping Address Info */}
        <div className="mt-8">
          <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input type="text" placeholder="Address" name="address"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="text" placeholder="City" name="city"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            {/* <div>
              <input type="text" placeholder="State" name=""
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div> */}
            <div>
              <input type="text" placeholder="Zip Code" name="zip"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
          </div>
          {/* buttons */}
          <div className="flex gap-4 max-md:flex-col mt-8">
            <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
            <button type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">Complete Purchase</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
// const formPayloadData: FormPayloadData = {
//   invoiceDescription: "Checkout completed",
//   price: 200,
//   name: "John doe",
//   email: "example@gmail.com",
//   phone: "+972-54-9891981",
//   address: "street address",
//   city: "Holon",
//   zipCode: "5820614",
//   itemDescription: "Hummus",
// };
