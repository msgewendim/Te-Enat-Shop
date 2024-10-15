import { createContext } from "react";
import { CartItem, OrderItem } from "../../client/types.gen";

export type query = {
  page?: number;
  category?: string;
  filter?: string;
  limit?: number;
};

interface IContext {
  category: string;
  page: number;
  filter: string;
  orderItems: OrderItem[];
  paymentFormUrl: string;
  cartItems: CartItem[];
  totalPrice: number;
  sizeIdx: number;
  setSizeIdx: (sizeIdx: number) => void;
  setTotalPrice: (price: number) => void;
  setFilter: (filter: string) => void;
  setPage: (newPage: number) => void;
  setCategory: (newCategory: string) => void;
  setCartItems: (product: CartItem[]) => void;
  setOrderItems: (item: OrderItem[]) => void;
  setPaymentFormUrl: (url: string) => void;
}

export const AppContext = createContext<IContext>({
  category: "",
  page: 0,
  filter: "",
  sizeIdx: 0,
  setSizeIdx: () => {},
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
  setTotalPrice: () => {},
});
