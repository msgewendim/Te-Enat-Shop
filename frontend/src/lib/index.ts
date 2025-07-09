import { postUtil } from "./api";
import {
  PaymentFormSuccessResponse,
  CheckoutPayload,
} from "../client/types.gen";
import { DesignProductFormData } from "../components/layout/modals/DesignProduct";
import { EarlyAdoptersFormData } from "../components/layout/modals/EarlyAdapters";

// Send the minimal checkout data to your payment gateway API
const getPaymentForm = async (
  checkoutData: CheckoutPayload
): Promise<PaymentFormSuccessResponse> => {
  // Send minimal cart items (IDs only) - backend will fetch full item details
  return (
    await postUtil(`/orders/generate-sale`, {
      orderItems: checkoutData.orderItems, // MinimalCartItem[] with IDs only
      totalPrice: checkoutData.totalPrice,
      customer: checkoutData.customer,
    })
  ).data;
};

const addToNewsletter = async (data: NewsLetterData) => {
  return (
    await postUtil(`/users/form/newsletter`, {
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
    await postUtil(`/users/form/early-adapter`, {
      data,
    })
  ).data;
};

const addDesignProduct = async (data: DesignProductFormData) => {
  return (
    await postUtil(`/users/form/design-product`, {
      data,
    })
  ).data;
};


const getItemsByNames = async (names: string[]) => {
  return (
    await postUtil(`/products/names`, {
      names,
    })
  ).data;
};

export {
  addEarlyAdapter,
  addDesignProduct,
  addToNewsletter,
  getPaymentForm,
  getItemsByNames,
};

