import { ClientDetails, OrderItem } from "../../../types/order.types";

interface PayplusGenLinkPayload {
  payment_page_uid: string;
  charge_method: typeof CHARGE_METHOD[keyof typeof CHARGE_METHOD];
  success_url: string;  // URL to redirect the user to if the payment is successful
  cancel_url: string;  // URL to redirect the user to if the payment is cancelled
  currency_code: "ILS";
  amount: number;  // The total amount of the order default is 1
  send_failure_callback: boolean;  // Send failure callback default is false
  sendEmailApproval: boolean;  // Send email approval default is true
  sendEmailFailure: boolean;  // Send email failure default is false
  customer: ClientDetails;
  items: OrderItem[];
  max_payments: number;
  refURL_success: string;  // IPN URL to sent the payment success status - backend
  refURL_failure: string;  // IPN URL to sent the payment failure status - backend
  refURL_cancel: string;  // IPN URL to sent the payment cancelled status - backend
  more_info?: string;  // More information about the payment
}

export const CHARGE_METHOD = {
  CHECK: 0,
  CHARGE: 1,
  APPROVAL: 2,
  RECURRING_PAYMENTS: 3,
  REFUND: 4,
  TOKEN: 5, 
} as const;


// nullable if send in item "product_uid" we will use this product or send error, 
// if send "name" and not "product_uid" we will create new product with this name. 
// more option to send if ("name" && !product_uid): vat_type, barcode, value,price.last option we will use default product

interface PayplusRequestHeaders {
  "api-key": string;
  "secret-key": string;
}


interface PayplusGenLinkResponse200 {
  result: {
    status: string;
    description: string;
    code: number; // default is 0
  }
  data : {
    page_request_uid: string;
    payment_page_link: string;
    qr_code_image: string;
  }
}

interface PayplusGenLinkResponse422 {
  message: string;
}
export type { PayplusGenLinkPayload, PayplusRequestHeaders,PayplusGenLinkResponse200 , PayplusGenLinkResponse422 };