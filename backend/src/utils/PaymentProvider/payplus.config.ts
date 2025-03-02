import {  BACKEND_APP_URL, NODE_ENV, PAYPLUS_PAYMENT_PAGE_UID,FRONTEND_URL_PRODUCTION, PAYPLUS_TERMINAL_UID } from "../config/env.config";
import { CHARGE_METHOD, PayplusGenLinkPayload } from "./types";
import axiosInstance from "../middleware/axiosInstance";
import { Customer, CartItem } from "../../../types/order.types";
import { PayplusGenLinkResponse200,} from './types';
import axios from 'axios';

const NGROK_URL_BACKEND = "https://db7e-77-124-17-69.ngrok-free.app";
const NGROK_URL_FRONTEND = "https://9564-77-124-17-69.ngrok-free.app";
const FRONTEND_URL = NODE_ENV === "production" ?  FRONTEND_URL_PRODUCTION : NGROK_URL_FRONTEND;
const BACKEND_URL = NODE_ENV === "production" ? BACKEND_APP_URL  : NGROK_URL_BACKEND;


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
    refURL_success: `${FRONTEND_URL}/thank-you`,  // Customer redirect on success
    refURL_failure: `${FRONTEND_URL}/error`,             // Customer redirect on cancel
    refURL_cancel: `${FRONTEND_URL}/checkout`,      // Customer redirect on failure
    refURL_callback: `${BACKEND_URL}/api/orders/notify`, // Backend IPN for success

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