import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClientDetails } from "../../client/types.gen";
import { useAppContext } from "./useAppContext";
import { clientDetailsSchema } from "../../validation/ClientDetails.validation";
import { useGetPaymentFormMutation } from "../useAppData";

function useCheckoutFormData() {
  const { totalPrice, orderItems, setPaymentFormUrl } = useAppContext();
  const { handleSubmit, register, reset, control } = useForm<ClientDetails>();
  const { t } = useTranslation();
  const getPaymentFormMutation = useGetPaymentFormMutation();
  const [clientData, setClientData] = useState<ClientDetails>();
  const navigate = useNavigate();

  const handleGetPaymentForm: SubmitHandler<ClientDetails> = (data) => {
    setClientData(data);
    const result = clientDetailsSchema.safeParse(data);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.info(firstError.message); // Show first validation error
      return;
    }

    clientData &&
      // get url from server
      getPaymentFormMutation.mutate({
        clientInfo: clientData,
        totalPrice,
        products: orderItems,
      });
  };

  // Side effect when mutation succeeds
  useEffect(() => {
    if (getPaymentFormMutation.isSuccess && getPaymentFormMutation.data) {
      console.log("Payment form URL:", getPaymentFormMutation.data.data.url);
      setPaymentFormUrl(getPaymentFormMutation.data.data.url);
    }
  }, [getPaymentFormMutation.isSuccess, getPaymentFormMutation.data, setPaymentFormUrl]);

  // Handle errors
  useEffect(() => {
    if (getPaymentFormMutation.isError) {
      toast.error(t("checkout.errorFetchingPaymentForm"));
    }
  }, [getPaymentFormMutation.isError, t]);

  const handleReturnToShop = () => {
    reset(); // Reset the form
    setPaymentFormUrl(""); // Reset the payment form URL
    navigate("/products");
  };

  useEffect(() => {
    const handleReloadRefresh = () => {
      reset(); // Reset the form
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
  return {
    register,
    control,
    handleSubmit,
    clientData,
    handleGetPaymentForm,
    handleReturnToShop,
  }
}

export default useCheckoutFormData