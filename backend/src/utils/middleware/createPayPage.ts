// import { ClientDetails, OrderItem } from "../../../types/order.types";
// import { PaymentFormPayload } from "../../../types/order.types";
// import { BACKEND_APP_URL, BASE_URL_NGROK, I_COUNT_API_ACCESS_TOKEN, I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT, I_COUNT_API_REFRESH_TOKEN, I_COUNT_API_URL, NODE_ENV } from "../config/env.config";
// import { apiRequest, checkToken } from "./getICountToken";
// const BASE_URL_API =
//   NODE_ENV === "production" ? BACKEND_APP_URL : BASE_URL_NGROK;

// export const getCheckoutFormPayload = (
//   totalPrice: number,
//   pluginId: string,
//   clientDetails: ClientDetails,
//   income: OrderItem[],
//   custom: string
// ) => {

// }

// export const createICountPayPage = async (payPageCreateData: PayPageCreateRequest) => {
//   const url = `${I_COUNT_API_URL}/paypage/create`;
//   const body = { ...payPageCreateData };
//    const {access_token} = await checkToken();
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };
//   const data = await apiRequest<CreatePayPageResponse>(url, body, headers);
//   console.log(data, "response data from iCount create payPage");
//   return data;
// }

// type CreatePayPageResponse = {
//   paypage_id: number;
//   paypage_url: string;
//   status: boolean;
//   reason: string;
// };
// type GenerateSaleResponse = {
//   paypage_id: number;
//   paypage_url: string;
//   status: boolean;
//   reason: string;
//   sale_uniqid: string;
//   sale_sid: string;
//   sale_url: string
// };

// type SuccessfulPaymentResponse = {
//   cp: string,  // pay page id
//   items: string[],
//   items_info: object[],
//   sum: string,  // total amount of the order
//   currency_id: string,  // currency id = 5 for ILS
//   currency_code: string,  // currency code = ILS
//   num_of_payments: string,  // number of payments
//   confirmation_code: string,  // confirmation code
//   doctype: string,   // invrec
//   docnum: string,   // invoice number

//   // customer info
//   customer_id: string,
//   customer_name: string,
//   customer_fname: string,
//   customer_lname: string,
//   customer_email: string,
//   customer_vat_id: string,   // personal id
//   customer_phone: string,
//   customer_country: string,
//   customer_city: string,
//   customer_zip: string,
//   customer_street: string,
//   customer_street_number: string,

//   // customer billing info
//   cc_type: string,    // credit card type
//   cc_last4: string,   // last 4 digits of the credit card

//   // order date
//   payment_date: string,
//   // customer address info
//   recipient_name: string,
//   recipient_fname: string,
//   recipient_lname: string,
//   recipient_phone: string,
//   recipient_country: string,
//   recipient_city: string,
//   recipient_zip: string,
//   recipient_street1: string,
//   recipient_street2: string,

//   // delivery info
//   delivery_method: string,
//   shipping_fee: string,
//   doc_url: string,
// }

// export const generateSaleUrl = async (generateSalePayload: PayPageGenerateSaleRequest) => {
//   const url = `${I_COUNT_API_URL}/paypage/generate_sale`;
//   const body = { ...generateSalePayload };
//   const {access_token} = await checkToken();
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };
//   const data = await apiRequest<GenerateSaleResponse>(url, body, headers);
//   console.log(data, "response data from iCount generate sale");
//   return data.sale_url;
// }

// // Types for /paypage/create

// type DeliveryMethod = {
//   he: string;
//   en: string;
//   price: number;
//   self_pickup?: boolean;
// };

// type PayPageCreateRequest = {
//   page_name: string;
//   page_name_en?: string;
//   header_text?: string;
//   header_text_en?: string;
//   extended_description?: string;
//   extended_description_en?: string;
//   currency_id: number;
//   items?: Array<{
//     id?: number;
//     name?: string;
//     size?: number;
//     url?: string;
//     uploaded?: string;
//   }>;
//   tax_exempt?: boolean | 'auto';
//   require_id?: boolean;
//   require_fname_lname?: boolean;
//   require_phone?: boolean;
//   request_address?: boolean;
//   display_delivery_address?: boolean;
//   delivery_methods?: DeliveryMethod[];
//   require_3ds?: number;
//   captcha?: boolean;
//   require_tos?: boolean;
//   tos_link?: string;
//   max_payments?: number;
//   max_payments_advanced?: string;
//   installments_interest_rate?: string;
//   doctype?: string;
//   user_id?: number;
//   income_type_id?: number;
//   client_type_id?: number;
//   page_lang?: 'en' | 'he' | 'auto';
//   hide_lang?: boolean;
//   hk_start_date?: string;
//   hk_billing_day?: number;
//   hk_start_after?: number;
//   hk_issue_every?: number;
//   hk_payments?: number | string;
//   hk_payment_sum_calc?: 'FULL' | 'PART';
//   custom_css?: string;
//   success_url?: string;
//   ipn_url?: string;
// };

// // Types for /paypage/generate_sale

// type PayPageItem = {
//   id?: number;
//   inventory_item_id?: number;
//   sku?: string;
//   description?: string;
//   description_en?: string;
//   description_he?: string;
//   unitprice?: number;
//   unitprice_incl?: number;
//   orig_price?: number;
//   quantity?: number;
//   min_quantity?: number;
//   max_quantity?: number;
//   default_quantity?: number;
//   quantity_step?: number;
//   sum?: number;
// };
// const delivery_methods: DeliveryMethod[] = [
//   {
//     he: "משלוח אקספרס",
//     en: "Express delivery",
//     price: 30,
//   },
//   { 
//     he: "משלוח רגיל",
//     en: "Regular delivery",
//     price: 15, 
//   }
// ]
// export const getGenerateSalePayload =( orderItems: OrderItem[], orderId: string) : PayPageGenerateSaleRequest=> {
//   const modifiedOrderItems = orderItems.map((item) => ({
//     ...item,
//     description: item.description + " " + item.size,
//     unitprice: item.unitPrice,
//   }));
  
//   return {
//     paypage_id: "30",
//     page_lang: "he",
//     currency_id: 5, // 5 for ILS
//     currency_code: 'ILS',
//     items: modifiedOrderItems,
//     // client Info
//     // client_name: clientDetails.firstName + ' ' + clientDetails.lastName,
//     // first_name: clientDetails.firstName,
//     // last_name: clientDetails.lastName,
//     // email: clientDetails.email,
//     // phone: clientDetails.phone,
//     // country_code: 'IL',
//     // city: clientDetails.city,
//     // zip: clientDetails.zip,
//     // street: clientDetails.street,
//     // street_num: clientDetails.streetNum,
//     delivery_methods: delivery_methods,
//     max_payments: 1,
//     max_payments_advanced: 'FULL',
//     // success_url: 'https://tenat.co.il/thank-you',
//     success_url: 'https://f9e2-109-67-140-97.ngrok-free.app/thank-you',
//     cancel_url: 'https://f9e2-109-67-140-97.ngrok-free.app',
//     ipn_url: 'https://95e9-109-67-140-97.ngrok-free.app/api/orders/notify',
//     is_iframe: true
// }
// }

// type PageLang = {
//   he: string;
//   en: string;
//   auto: string;
// }
// type PayPageGenerateSaleRequest = {
//   paypage_id: string;
//   currency_id?: number;  // 5 for ILS
//   currency_code?: string;  // ILS
//   items: OrderItem[];
//   client_type_id?: number;
//   income_type_id?: number;
//   vat_id?: string;
//   client_name?: string;
//   first_name?: string;
//   last_name?: string;
//   email?: string;
//   phone?: string;
//   country_code?: string;
//   city?: string;
//   zip?: string;
//   street?: string;
//   street_num?: string;
//   delivery_methods?: DeliveryMethod[];
//   max_payments?: number;
//   max_payments_advanced?: string;
//   hk_start_date?: string;
//   hk_billing_day?: number;
//   hk_start_after?: number;
//   hk_issue_every?: number;
//   hk_payments?: number | string;
//   hk_payment_sum_calc?: 'FULL' | 'PART';
//   page_lang?: keyof PageLang;
//   success_url?: string;
//   failure_url?: string;
//   cancel_url?: string;
//   ipn_url?: string;
//   is_iframe?: boolean;
//   utm_campaign?: string;
//   utm_source?: string;
//   utm_medium?: string;
//   utm_term?: string;
//   utm_content?: string;
//   page_name?: string;
// };
