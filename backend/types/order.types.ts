interface Order {
  _id?: string;
  products: OrderItem[];
  userDetails: ClientDetails;
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt?: Date;
  client_id: string;
  transaction_id: string;
}

type OrderTransaction = {
  external_data: string;
  transaction_id: string;
  client_id: string;
  id: string;
  document_id: string;
  original_doc_url: string;
};
type PaymentFormResponse = {
  errorCode: number;
  errorMessage: string;
  success?: boolean;
  url?: string;
  orderId: string;
};
interface ClientDetails {
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postal_code: string;
  customer_external_number?: string; // This field will be used to pass your external customer id from ERP or other system
}

interface OrderItem {
  name: string;
  quantity: number;
  size: string;
  price: number;
  product_uid?: string;  // product uid from your system
}

export type PaymentFormRequest = {
  clientInfo: ClientDetails;
  totalPrice: number;
  orderItems: OrderItem[];
};

interface PaymentFormPayload {
  description: string; // Document description תיאור מסמך  Required
  type: 320 | 400; // Document type 320 : חשבונית מס / קבלה  // 400  Required
  lang: string; // Primary language  Required
  currency: string; // Primary currency  Required
  vatType: 0 | 1 | 2; // Vat type for that document Required
  amount: number; // The amount the customer needs to pay
  maxPayments: number; //
  group: number; // Required only when using 'Digital payments(Grow)' plugin. = 100
  pluginId: string; // Clarence Plugin Id. Required unless you are using Cardcom plugin.
  client: ClientDetails; // customer information
  income: OrderItem[]; // the items to be ordered
  remarks: string;
  successUrl?: string; // customer successfully paid (can be for example a "Thank you for your purchase" notification), if not set - uses the default "Thank you for your purchase" notification, This has to be a secured URL (https)
  failureUrl?: string; // redirect to when the customer payment failed, if not set - uses the default "Purchase failed" notification, This has to be a secured URL (https)
  notifyUrl?: string; // The URL to notify about regarding a successfully paid transaction and after a document has been created, parameters to this endpoint will be given as POST parameters, This has to be a secured URL (https)
  custom: string; // Set a custom data to pass to notification, success & failed URLs, such as your internal order ID that will be passed back to your system as a parameter
}
interface iCountPaymentPageRequest {
  sid: string; // Your iCount session ID
  cid: string; // Your iCount company identifier
  user: string; // Your iCount username
  pass: string; // Your iCount password
  page_name: string; // Required: A name for this payment page
  currency_id: number; // Required: Currency ID as per iCount's system
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>; // Required: List of items to be purchased
  extended_description: string; // Optional: Combine your description and remarks here
  page_lang: 'en' | 'he' | 'auto'; // Optional: Page language
  tax_exempt: 'true' | 'false' | 'auto'; // Optional: Based on your vatType
  max_payments: number; // Optional: Maximum number of installments
  doctype: string; // Optional: "invoice" or "receipt" based on your type
  success_url: string; // Optional: URL to redirect after successful payment
  ipn_url: string; // Optional: URL for server-to-server updates
  require_fname_lname: boolean; // Optional: Require customer name
  require_phone: boolean; // Optional: Require customer phone
  request_address: boolean; // Optional: Request customer address
}

type CreateICountSession = {
  sid: string;
  url: string;  
  error: string;
};
export {
  Order,
  OrderTransaction,
  PaymentFormPayload,
  OrderItem,
  ClientDetails,
  PaymentFormResponse,
  iCountPaymentPageRequest,
};
