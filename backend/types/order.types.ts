import { Package, Product } from "./product.types";

interface Order {
  /**
   * Unique identifier for the order
   */
  _id: string;
  customer: Customer;
  orderItems: Array<CartItem>;
  totalPrice: number;
  paymentStatus: 'pending' | 'succeeded' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
};

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

export type Customer = {
  firstName: string;
  lastName: string;
  /**
   * Customer phone number
   */
  phone: string;
  /**
   * Customer email address
   */
  email: string;
  address: Address;
  /**
   * Customer notes
   */
  notes: string;
};

export type Address = {
  street: string;
  streetNum: string;
  city: string;
  postal_code?: string;
};

// interface OrderItem {
//   name: string;
//   quantity: number;
//   size: string;
//   price: number;
//   product_uid?: string;  // product uid from your system
// }
export type CartItem = {
  /**
   * The item in the cart
   */
  item: (Product | Package);
  /**
   * Type of the item (Product or Package)
   */
  itemType: 'Product' | 'Package';
  /**
   * Quantity of the product in the cart
   */
  quantity: number;
  /**
   * Size of the product in grams or kg
   */
  size: string;
  /**
   * Price of the product in the cart
   */
  price: number;
  /**
   * Name of the product
   */
  name: string;
  /**
   * Image URL of the product
   */
  image?: string;
};

export type PaymentFormRequest = {
  customer: Customer;
  totalPrice: number;
  orderItems: CartItem[];
};

export {
  Order,
  OrderTransaction,
  PaymentFormResponse,
};
