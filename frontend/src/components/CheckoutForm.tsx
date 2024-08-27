
const CheckoutForm = () => {
  return (
    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
      <form className="mt-8">
        <div>
          <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input type="text" placeholder="First Name"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="text" placeholder="Last Name"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="email" placeholder="Email"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="tel" placeholder="Phone No." max="10"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
          </div>
        </div>
        {/* Shipping Address Info */}
        <div className="mt-8">
          <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input type="text" placeholder="Address Line"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="text" placeholder="City"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="text" placeholder="State"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
            <div>
              <input type="text" placeholder="Zip Code"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
            </div>
          </div>
          {/* buttons */}
          <div className="flex gap-4 max-md:flex-col mt-8">
            <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
            <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">Complete Purchase</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm