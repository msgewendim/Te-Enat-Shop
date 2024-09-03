import { createContext } from "react";
import {
  CartItem,
  ClientDetails,
  DeleteProductsByIdError,
  DeleteProductsByIdResponse,
  GetAllProductsError,
  GetAllProductsResponse,
  GetProductError,
  GetProductResponse,
  OrderItem,
  PostOrdersV1PaymentsFormData,
  PostOrdersV1PaymentsFormError,
  PostOrdersV1PaymentsFormResponse,
  PostProductsError,
  PostProductsResponse,
  Product,
  PutProductsByIdError,
  PutProductsByIdResponse,
} from "../../client/types.gen";

export type query = {
  page?: number;
  category?: string;
  filter?: string;
  limit?: number;
};

interface IContext {
  products: Product[];
  getProducts: (
    query?: query
  ) => Promise<GetAllProductsResponse | GetAllProductsError>;
  getProductById: (id: string) => Promise<GetProductResponse | GetProductError>;
  addProduct: (
    productData: Partial<Product>
  ) => Promise<PostProductsResponse | PostProductsError>;
  updateProduct: (
    id: string,
    productData: Partial<Product>
  ) => Promise<PutProductsByIdResponse | PutProductsByIdError>;
  deleteProduct: (
    id: string
  ) => Promise<DeleteProductsByIdResponse | DeleteProductsByIdError>;
  getPaymentForm: (
    clientInfo: ClientDetails,
    totalPrice: number,
    orderItems: OrderItem[]
  ) => Promise<
    PostOrdersV1PaymentsFormError | PostOrdersV1PaymentsFormResponse | PostOrdersV1PaymentsFormData
  >;
  category: string;
  page: number;
  filter: string;
  orderItems: OrderItem[];
  paymentFormUrl: string;
  cartItems: CartItem[];
  totalPrice: number;
  setFilter: (filter: string) => void;
  setPage: (newPage: number) => void;
  setCategory: (newCategory: string) => void;
  setCartItems: (product: CartItem[]) => void;
  setOrderItems: (item: OrderItem[]) => void;
  setPaymentFormUrl: (url: string) => void;
}

export const AppContext = createContext<IContext>({
  products: [],
  getProducts: () => Promise.resolve([]),
  getProductById: () => Promise.resolve(),
  addProduct: () => Promise.resolve(),
  updateProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
  getPaymentForm: () => Promise.resolve(),
  category: "",
  page: 0,
  filter: "",
  cartItems: [],
  orderItems: [],
  totalPrice: 0,
  paymentFormUrl: "",
  setPaymentFormUrl: () => {},
  setOrderItems: () => {},
  setCartItems: () => {},
  setFilter: () => {},
  setPage: () => {},
  setCategory: () => {},
});
