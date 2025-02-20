import { PAYPLUS_PAYMENT_PAGE_UID, PAYPLUS_TERMINAL_UID } from "../config/env.config";
import { CHARGE_METHOD, PayplusGenLinkPayload, PayplusGenLinkResponse200, PayplusGenLinkResponse422 } from "./types";
import axiosInstance from "../middleware/axiosInstance";
import { ClientDetails, OrderItem } from "../../../types/order.types";
import validatePaymentRequest from "../../validators/payments";

export const payplusGenLinkPayload: PayplusGenLinkPayload = {
  items: [
    {
      name: "test",
      quantity: 1,
      price: 10,
      size: "100",
    },
  ],
  amount: 10,
  charge_method : CHARGE_METHOD.CHECK,
  success_url: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // frontend url
  cancel_url: "https://f9e2-109-67-140-97.ngrok-free.app", // frontend url
  max_payments : 1,
  payment_page_uid: "122222",
  currency_code: "ILS",
  send_failure_callback : true,
  sendEmailApproval: true,
  sendEmailFailure: true,
  customer: {
    customer_name: "msganaw",
    email: "msganaw@gmail.com",
    phone: "0521234567",
    city: "Tel Aviv",
    address: "street 1",
    postal_code: "12345",
  },
  refURL_success: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // backend url
  refURL_failure: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
  refURL_cancel: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
};

export const getPayplusGenLinkPayload = (orderItems: OrderItem[], customerInfo: ClientDetails, totalPrice: number, moreInfo: string) : PayplusGenLinkPayload => {
  const payload : PayplusGenLinkPayload = {
    items: orderItems,
    amount: totalPrice,
    charge_method: CHARGE_METHOD.CHECK,
    success_url: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // frontend url
    cancel_url: "https://f9e2-109-67-140-97.ngrok-free.app", // frontend url
    max_payments : 1,
    payment_page_uid: PAYPLUS_PAYMENT_PAGE_UID,
    currency_code: "ILS",
    send_failure_callback : true,
    sendEmailApproval: true,
    sendEmailFailure: false,
    customer: customerInfo,
    refURL_success: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // backend url
    refURL_failure: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
    refURL_cancel: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
    more_info: moreInfo,
  };

  validatePaymentRequest(payload);
  return payload;
};


export const getPaymentLink = async (payload: PayplusGenLinkPayload) : Promise<PayplusGenLinkResponse200 | PayplusGenLinkResponse422> => {
  try {
    const link = await axiosInstance.post(
      `/PaymentPages/generateLink/`,
      payload,
    );
    return link.data.data.payment_page_link;
  } catch (error) {
    return error as PayplusGenLinkResponse422;
  }
}

export const getPaymentpagesList = async () => {
  try {
    const link = await axiosInstance.get(
      `/PaymentPages/list/`,
      { headers: { terminal_uid: PAYPLUS_TERMINAL_UID } }
    );
    return link;
  } catch (error) {
    return error;
  }
}