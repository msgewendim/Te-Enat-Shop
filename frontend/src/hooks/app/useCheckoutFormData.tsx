import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppContext } from "./useAppContext";
import { Customer } from "../../client/types.gen";
import { clientDetailsSchema } from "../../validation/ClientDetails.validation";
import { useGetPaymentFormMutation } from "../useAppData";

function useCheckoutFormData() {
  const { totalPrice, cartItems, setPaymentFormUrl } = useAppContext();
  const { handleSubmit, register, reset, control } = useForm<Customer>();
  const { t } = useTranslation();
  const getPaymentFormMutation = useGetPaymentFormMutation();
  const [clientData, setClientData] = useState<Customer>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleGetPaymentForm: SubmitHandler<Customer> = async (data) => {
    try {
      setIsSubmitting(true);
      setClientData(data);
      const result = clientDetailsSchema.safeParse(data);
      if (!result.success) {
        const firstError = result.error.errors[0];
        toast.info(firstError?.message || t('checkout.errorSubmittingForm'));
        setIsSubmitting(false);
        return;
      }

      // Send request to backend
      getPaymentFormMutation.mutate({
        customer: data,
        totalPrice,
        orderItems: cartItems,
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('checkout.errorSubmittingForm'));
      setIsSubmitting(false);
    }
  };

  // Side effect when mutation succeeds
  useEffect(() => {
    if (getPaymentFormMutation.isSuccess && getPaymentFormMutation.data) {
      const paymentUrl = getPaymentFormMutation.data;
      setIsSubmitting(false);
      console.log("payment form data", paymentUrl);
      // check if the payment url is a valid url
      if (!isValidUrl(paymentUrl.url)) {
        toast.error(t('checkout.invalidPaymentUrl'));
        setIsSubmitting(false);
        return;
      }
      console.log("Payment form URL:", paymentUrl, getPaymentFormMutation.data);
      setPaymentFormUrl(paymentUrl.url);
      // open the payment url in a new tab
      window.open(paymentUrl.url, '_blank');
    } else if (getPaymentFormMutation.isError) {
      setIsSubmitting(false);
      toast.error(t('checkout.errorFetchingPaymentForm'));
    }
  }, [getPaymentFormMutation.isSuccess, getPaymentFormMutation.data, getPaymentFormMutation.isError, setPaymentFormUrl, t]);

  const handleReturnToShop = () => {
    reset();
    setPaymentFormUrl("");
    navigate("/products");
  };

  useEffect(() => {
    const handleReloadRefresh = () => {
      reset();
      setPaymentFormUrl("");
    };

    window.addEventListener('beforeunload', handleReloadRefresh);
    window.addEventListener('popstate', handleReloadRefresh);

    return () => {
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
    isSubmitting,
  };
}

const isValidUrl = (url: string) => {
  try {
    // check if the url is a valid url
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export default useCheckoutFormData