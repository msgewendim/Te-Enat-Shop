import { ClientDetails, OrderItem } from "../../../types/order.types";
import { PaymentFormPayload } from "../../../types/order.types";
import { I_COUNT_API_ACCESS_TOKEN, I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT, I_COUNT_API_REFRESH_TOKEN, I_COUNT_API_URL } from "../config/env.config";
import { apiRequest, checkToken } from "./getICountToken";
// const BASE_URL_API =
//   NODE_ENV === "production" ? BACKEND_APP_URL : BASE_URL_NGROK;

export const getCheckoutFormPayload = (
  totalPrice: number,
  pluginId: string,
  clientDetails: ClientDetails,
  income: OrderItem[],
  custom: string
) => {
  
}

const createICountPayPage = async () => {
  const url = `${I_COUNT_API_URL}/paypage/create`;
  const body = { 
    
   };
   const {access_token} = await checkToken(I_COUNT_API_REFRESH_TOKEN, I_COUNT_API_ACCESS_TOKEN, new Date(I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const data = await apiRequest<PayPageConfig>(url, body, headers);
  
}

interface PayPageConfig {
  // Basic Page Information
  page_name: string;
  page_name_en?: string;
  header_text?: string;
  header_text_en?: string;

  // Currency and Pricing
  currency_id: number;
  items: Array<{
    name: string;
    price: number;
  }>;

  // Customer Information Requirements
  require_fname_lname: boolean;
  require_phone: boolean;
  request_address: boolean;

  // Optional Fields
  extended_description?: string;
  extended_description_en?: string;
  display_delivery_address?: boolean;
  require_id?: boolean;

  // Payment Options
  max_payments?: number;
  require_3ds?: number;

  // Page Settings
  page_lang?: 'en' | 'he' | 'auto';
  hide_lang?: boolean;
  captcha?: boolean;
  require_tos?: boolean;
  tos_link?: string;

  // Styling and Customization
  custom_css?: string;

  // URLs
  success_url: string;
  ipn_url?: string;

  // Additional Options
  tax_exempt?: boolean | 'auto';
  doctype?: string;
  user_id?: number;
}