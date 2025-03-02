import { PAYPLUS_PAYMENT_PAGE_UID, PAYPLUS_TERMINAL_UID } from "../config/env.config";
import { CHARGE_METHOD, PayplusGenLinkPayload } from "./types";
import axiosInstance from "../middleware/axiosInstance";
import { Customer, CartItem } from "../../../types/order.types";
import { PayPlusLinkPayload, PayplusGenLinkResponse200, PayplusGenLinkResponse422} from './types';
import axios from 'axios';

// export const payplusGenLinkPayload: PayplusGenLinkPayload = {
//   items: [
//     {
//       name: "test",
//       quantity: 1,
//       price: 10,
//       size: "100",
//     },
//   ],
//   amount: 10,
//   charge_method : CHARGE_METHOD.CHECK,
//   success_url: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // frontend url
//   cancel_url: "https://f9e2-109-67-140-97.ngrok-free.app", // frontend url
//   max_payments : 1,
//   payment_page_uid: "122222",
//   currency_code: "ILS",
//   send_failure_callback : true,
//   sendEmailApproval: true,
//   sendEmailFailure: true,
//   customer: {
//     customer_name: "msganaw",
//     email: "msganaw@gmail.com",
//     phone: "0521234567",
//     city: "Tel Aviv",
//     address: "street 1",
//     postal_code: "12345",
//   },
//   refURL_success: "https://f9e2-109-67-140-97.ngrok-free.app/thank-you", // backend url
//   refURL_failure: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
//   refURL_cancel: "https://f9e2-109-67-140-97.ngrok-free.app", // backend url
// };

const NGROK_URL_BACKEND = "https://db7e-77-124-17-69.ngrok-free.app";
const NGROK_URL_FRONTEND = "https://9564-77-124-17-69.ngrok-free.app";


export function getPayplusGenLinkPayload(
  orderItems: CartItem[], 
  customer: Customer, 
  totalPrice: number, 
  description: string
): PayplusGenLinkPayload {
  return {
    payment_page_uid: PAYPLUS_PAYMENT_PAGE_UID,
    charge_method: CHARGE_METHOD.CHECK,
    currency_code: "ILS",
    amount: totalPrice,
    sendEmailApproval: true,
    sendEmailFailure: false,
    send_failure_callback: false,
    customer: {
      customer_name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone,
      city: customer.address.city,
      address: customer.address.street + " " + customer.address.streetNum,
      // postal_code: customer.address.postal_code || ""
    },
    items: orderItems.map(orderItem => ({
      name: orderItem.item.name,
      quantity: orderItem.quantity,
      price: orderItem.price,
      product_invoice_extra_details: orderItem.size
    })),
    // Redirect URLs - where customer is redirected in browser
    refURL_success: `${NGROK_URL_FRONTEND}/thank-you`,  // Customer redirect on success
    refURL_failure: `${NGROK_URL_FRONTEND}/error`,             // Customer redirect on cancel
    refURL_cancel: `${NGROK_URL_FRONTEND}/chekout`,      // Customer redirect on failure
    refURL_callback: `${NGROK_URL_BACKEND}/api/orders/notify`, // Backend IPN for success

    more_info: description,
    language_code: "he",
    payments: 1,
  };
}

export async function getPaymentLink(payload: PayplusGenLinkPayload) {
  try {
    const response = await axiosInstance.post<PayplusGenLinkResponse200>(
      `/PaymentPages/generateLink/`,
      payload
    );

    if (response.status !== 200 || response.data.results.code !== 0) {
      throw new Error(response.data.results.description || 'Payment link generation failed');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`PayPlus API error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
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