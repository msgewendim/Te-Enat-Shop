import axios from "axios";
import {
  CartItem,
  GetOrdersPaymentStatusResponse,
  PaymentFormPayload,
  PaymentFormSuccessResponse,
} from "../../client/types.gen";
import { BASE_API_URL } from "../../utils/env.config";

// Send the form data to your payment gateway API
const getPaymentForm = async (
  formData: PaymentFormPayload
): Promise<PaymentFormSuccessResponse> => {
  // Send the form data to your payment gateway API
  return (
    await axiosInstance.post(`/orders/v1/payments/form`, {
      formData,
    })
  ).data;
};

// Check the payment status with the provided order ID in your payment gateway API
const checkPaymentStatus = async (
  orderId: string
): Promise<GetOrdersPaymentStatusResponse> => {
  // Check the payment status with the provided order ID in your payment gateway API
  return (
    await axiosInstance.get(`/orders/payments/status`, {
      params: { orderId },
    })
  ).data;
};

// Add the product to the user's cart in your API endpoint
const addToCart = async (cartItem: CartItem, userId: string) => {
  return await axiosInstance.post(`/orders/${userId}/cart`, cartItem, {});
};

// Remove the product from the user's cart in your API endpoint
const removeFromCart = async (cartItem: CartItem, userId: string) => {
  return await axiosInstance.delete(`/orders/${userId}/cart/`, {
    data: cartItem,
  });
};

export { removeFromCart, addToCart, getPaymentForm, checkPaymentStatus };

export const axiosInstance = axios.create({ baseURL: BASE_API_URL });
