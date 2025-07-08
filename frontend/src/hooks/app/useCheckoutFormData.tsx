import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { Customer, CheckoutPayload } from "../../client/types.gen";
import { clientDetailsSchema } from "../../validation/client-details.validation";
import { useGetPaymentForm } from "../useAppData";
import { useCartStore } from "../../stores/useCartStore";
import { useCartTotals } from "./useCartData";

function useCheckoutFormData() {
  const { items: minimalCartItems, clearCart } = useCartStore();
  const { totalPrice } = useCartTotals(minimalCartItems);
  
  const { handleSubmit, register, reset, control, formState: { errors } } = useForm<Customer>({
    resolver: zodResolver(clientDetailsSchema),
  });
  
  const { t } = useTranslation();
  const getPaymentFormMutation = useGetPaymentForm();
  const [clientData, setClientData] = useState<Customer>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleGetPaymentForm: SubmitHandler<Customer> = async (data) => {
    try {
      setIsSubmitting(true);
      setClientData(data);

      // Create minimal checkout payload with only IDs and essential data
      const checkoutPayload: CheckoutPayload = {
        customer: data,
        totalPrice,
        orderItems: minimalCartItems, // Already minimal cart items with just IDs
      };

      console.log('Sending checkout payload:', checkoutPayload);

      // Send minimal payload to backend (validation is already handled by zodResolver)
      getPaymentFormMutation.mutate(checkoutPayload);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('checkout.errorSubmittingForm'));
      setIsSubmitting(false);
    }
  };

  // Side effect when mutation succeeds - preserve state on error
  useEffect(() => {
    if (getPaymentFormMutation.isSuccess && getPaymentFormMutation.data) {
      const paymentResponse = getPaymentFormMutation.data;
      setIsSubmitting(false);
      console.log("Payment form response:", paymentResponse);
      
      // Check if the payment url is a valid url
      if (!isValidUrl(paymentResponse.url)) {
        toast.error(t('checkout.invalidPaymentUrl'));
        setIsSubmitting(false);
        return;
      }
      
      console.log("Opening payment URL:", paymentResponse.url);
      
      // Store payment info but don't clear cart yet (in case payment fails)
      sessionStorage.setItem('pendingPayment', JSON.stringify({
        orderId: paymentResponse.orderId,
        url: paymentResponse.url,
        timestamp: Date.now()
      }));
      
      // Open the payment url in a new tab
      window.open(paymentResponse.url, '_blank');
      
      // Navigate to a waiting page instead of clearing cart immediately
      navigate('/checkout/payment-pending');
      
    } else if (getPaymentFormMutation.isError) {
      setIsSubmitting(false);
      console.error('Payment form error:', getPaymentFormMutation.error);
      
      // Preserve cart and customer data on error
      toast.error(t('checkout.errorFetchingPaymentForm'));
      
      // Don't reset form or clear cart on error - let user retry
    }
  }, [
    getPaymentFormMutation.isSuccess, 
    getPaymentFormMutation.data, 
    getPaymentFormMutation.isError,
    getPaymentFormMutation.error,
    navigate,
    t
  ]);

  const handleReturnToShop = () => {
    // Only reset form, don't clear cart unless user explicitly wants to
    reset();
    navigate("/products");
  };

  const handleClearCartAndReturn = () => {
    // Explicit cart clearing function
    clearCart();
    reset();
    sessionStorage.removeItem('pendingPayment');
    navigate("/products");
  };

  // Handle page refresh - preserve cart and customer data
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Don't clear cart on page refresh - it's already persisted in Zustand
      // Customer data should be preserved in form if possible
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    register,
    control,
    handleSubmit,
    errors,
    clientData,
    handleGetPaymentForm,
    handleReturnToShop,
    handleClearCartAndReturn,
    isSubmitting,
    cartItems: minimalCartItems,
    totalPrice,
    canSubmit: minimalCartItems.length > 0 && !isSubmitting,
  };
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default useCheckoutFormData;