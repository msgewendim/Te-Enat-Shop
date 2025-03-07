import axios from "axios";

import {
  GetOrdersPaymentStatusResponse,
  CartItem,
  PaymentFormPayload,
  PaymentFormSuccessResponse,
  SuccessResponse,
} from "../../client/types.gen";
import { DesignProductFormData } from "../../components/layout/modals/DesignProduct";
import { EarlyAdoptersFormData } from "../../components/layout/modals/EarlyAdapters";
import { BASE_API_URL } from "../../utils/env.config";

// Send the form data to your payment gateway API
const getPaymentForm = async (
  formData: PaymentFormPayload
): Promise<PaymentFormSuccessResponse> => {
  // Send the form data to your payment gateway API
  return (
    await axiosInstance.post(`/orders/generate-sale`, {
      formData,
    })
  ).data;
};

const getPaymentLinkFormICount = async (orderItems: CartItem[]): Promise<PaymentFormSuccessResponse> => {
  return (
    await axiosInstance.post(`/orders/generate-sale`, {
      orderItems,
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

const addToNewsletter = async (data: NewsLetterData) => {
  return (
    await axiosInstance.post(`/users/form/newsletter`, {
      data,
    })
  ).data;
};

export type NewsLetterData = {
  email: string;
  fullName: string;
  city: string;
};

const addEarlyAdapter = async (data: EarlyAdoptersFormData) => {
  return (
    await axiosInstance.post(`/users/form/early-adapter`, {
      data,
    })
  ).data;
};

const addDesignProduct = async (data: DesignProductFormData) => {
  return (
    await axiosInstance.post(`/users/form/design-product`, {
      data,
    })
  ).data;
};

export const addTobiaWaitingList = async (data: WaitingListData) => {
  return (
    await axiosInstance.post(`/users/form/tobia-waiting-list`, {
      data,
    })
  ).data;
};

export type WaitingListData = {
  email: string;
};

const getItemsByNames = async (names: string[]) => {
  return (
    await axiosInstance.post<SuccessResponse>(`/products/names`, {
      names,
    })
  ).data;
};

export {
  addEarlyAdapter,
  addDesignProduct,
  addToNewsletter,
  getPaymentForm,
  checkPaymentStatus,
  getItemsByNames,
  getPaymentLinkFormICount,
};

export const axiosInstance = axios.create({ baseURL: BASE_API_URL });
