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
  success?: true;
  url?: string;
  orderId: string;
};
interface ClientDetails {
  name: string;
  mobile: string;
  address: string;
  emails: string[];
  city: string;
  zip: string;
  taxId: string; // Unique identifier of my client in Morning
  add: boolean;
  country: string;
}
interface OrderItem {
  description: string;
  quantity: number;
  price: number;
  currency: string;
  vatType: 1 | 2 | 0; // Vat type for that document
}

export type PaymentForm = {
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
export {
  Order,
  OrderTransaction,
  PaymentFormPayload,
  OrderItem,
  ClientDetails,
  PaymentFormResponse,
};
