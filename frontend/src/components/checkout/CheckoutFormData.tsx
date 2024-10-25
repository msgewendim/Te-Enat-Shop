import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { toast } from "react-toastify"
import { SubmitHandler, useForm } from "react-hook-form";
import { ClientDetails } from "../../client/types.gen";
import { useGetPaymentFormMutation } from "../../hooks/useProductsData";
import { FormInput } from "../ui/FormInput";
import { useAppContext } from "../../hooks/useAppContext";


const clientDetailsSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).min(1),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(10),
  address: z.string({
    required_error: "Address is required"
  }),
  city: z.string({
    required_error: "City is required"
  }),
  zip: z.string().optional(),
});


const CheckoutFormData = () => {
  const { handleSubmit, register, reset } = useForm<ClientDetails>()
  const getPaymentFormMutation = useGetPaymentFormMutation()
  const { totalPrice, orderItems, setPaymentFormUrl } = useAppContext()
  const [clientData, setClientData] = useState<ClientDetails>()
  const navigate = useNavigate()

  const handleGetPaymentForm: SubmitHandler<ClientDetails> = (data) => {
    setClientData(data)
    const result = clientDetailsSchema.safeParse(data);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.info(firstError.message);  // Show first validation error
      return;
    }

    clientData &&
      // get url from server
      getPaymentFormMutation.mutate({
        clientInfo: clientData,
        totalPrice,
        products: orderItems,
      })
  }
  // Side effect when mutation succeeds
  useEffect(() => {
    if (getPaymentFormMutation.isSuccess && getPaymentFormMutation.data) {
      setPaymentFormUrl(getPaymentFormMutation.data.url);
    }
  }, [getPaymentFormMutation.isSuccess, getPaymentFormMutation.data, setPaymentFormUrl]);

  // Handle errors
  useEffect(() => {
    if (getPaymentFormMutation.isError) {
      toast.error("An error occurred while fetching the payment form.");
    }
  }, [getPaymentFormMutation.isError]);

  const handleReturnToShop = () => {
    reset();  // Reset the form
    setPaymentFormUrl("");  // Reset the payment form URL
    navigate("/products")
  }

  useEffect(() => {
    const handleReloadRefresh = () => {
      reset();  // Reset the form
      setPaymentFormUrl("");
    };

    // user reloads or navigates back
    window.addEventListener('beforeunload', handleReloadRefresh);
    window.addEventListener('popstate', handleReloadRefresh);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('beforeunload', handleReloadRefresh);
      window.removeEventListener('popstate', handleReloadRefresh);
    };
  }, [reset, setPaymentFormUrl]);

  return (
    <form className="mt-8" onSubmit={handleSubmit(handleGetPaymentForm)}>
      <div>
        <h3 className="text-base text-gray-800 mb-4">פרטים אישיים</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput<ClientDetails> placeholder="שם מלא" register={register} name="name" />
          <FormInput<ClientDetails> type="email" placeholder="מייל" register={register} name="email" />
          <FormInput<ClientDetails> type="tel" placeholder="מס פלאפון" classNames="text-right placeholder:text-right" register={register} name="mobile" />
        </div>
      </div>
      {/* Shipping Address Info */}
      <div className="mt-8">
        <h3 className="text-base text-gray-800 mb-4">כתובת למשלוח</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput<ClientDetails> placeholder="כתובת" register={register} name="address" />
          <FormInput<ClientDetails> placeholder="עיר" register={register} name="city" />
          <FormInput<ClientDetails> placeholder="מיקוד" register={register} name="zip" />
        </div>
        {/* buttons */}
        <div className="flex gap-4 max-md:flex-col mt-8">
          <button type="button" onClick={handleReturnToShop} className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-btnColor1 hover:text-white border border-gray-300 text-gray-800 max-md:order-1">ביטול</button>
          <input type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white" value={"לתשלום"} />
        </div>
      </div>
    </form>
  )
}



export default CheckoutFormData