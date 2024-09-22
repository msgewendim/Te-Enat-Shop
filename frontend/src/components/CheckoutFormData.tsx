import { useState, useContext } from "react"
import { ClientDetails } from "../client/types.gen"
import { AppContext } from "../providers/interface/context"

const CheckoutFormData = () => {
  const { totalPrice, orderItems, getPaymentForm } = useContext(AppContext)
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
      mobile: formData.get("mobile") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
    }
    setClientData(clientDetails)
    const isValid = validateClientDataForm()
    if (!isValid) return;
    try {
      const response = await getPaymentForm(clientData, totalPrice, orderItems)
      console.log(response);
    } catch (error) {
      console.log(error)
    }
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
  return (
    <form className="mt-8" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <h3 className="text-base text-gray-800 mb-4">פרטים אישיים</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input type="text" placeholder="שם מלא" name="name"
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
          <div>
            <input type="email" placeholder="מייל" name="email"
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
          <div>
            <input type="tel" placeholder="מס פלאפון" max="10" name="mobile"
              className="px-4 py-3 text-right bg-gray-100 placeholder:text-right focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
        </div>
      </div>
      {/* Shipping Address Info */}
      <div className="mt-8">
        <h3 className="text-base text-gray-800 mb-4">כתובת למשלוח</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input type="text" placeholder="כתובת" name="address"
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
          <div>
            <input type="text" placeholder="עיר" name="city"
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
          <div>
            <input type="text" placeholder="מיקוד" name="zip"
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2" />
          </div>
        </div>
        {/* buttons */}
        <div className="flex gap-4 max-md:flex-col mt-8">
          <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-btnColor1 hover:text-white border border-gray-300 text-gray-800 max-md:order-1">ביטול</button>
          <button type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white">לתשלום</button>
        </div>
      </div>
    </form>
  )
}

export default CheckoutFormData