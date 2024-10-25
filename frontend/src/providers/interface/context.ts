import { createContext } from "react";
import { CartItem, OrderItem, Product } from "../../client/types.gen";

export type query = {
  page?: number;
  category?: string;
  filter?: string;
  limit?: number;
};

export interface IContext {
  category: string;
  page: number;
  filter: string;
  orderItems: OrderItem[];
  paymentFormUrl: string;
  cartItems: CartItem[];
  totalPrice: number;
  sizeIdx: number;
  adminActiveSection: string;
  setSizeIdx: (sizeIdx: number) => void;
  setTotalPrice: (price: number) => void;
  setFilter: (filter: string) => void;
  setPage: (newPage: number) => void;
  setCategory: (newCategory: string) => void;
  setCartItems: (product: CartItem[]) => void;
  setOrderItems: (item: OrderItem[]) => void;
  setPaymentFormUrl: (url: string) => void;
  setAdminActiveSection: (section: string) => void;
  showModal: (onConfirm: () => void) => void;
  hideModal: () => void;
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  setProductToEdit: (product: Product | undefined) => void;
  productToEdit: Product | undefined;
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
  adminActiveSection: "",
  setPaymentFormUrl: () => {},
  setOrderItems: () => {},
  setCartItems: () => {},
  setFilter: () => {},
  setPage: () => {},
  setCategory: () => {},
  setTotalPrice: () => {},
  setAdminActiveSection: () => {},
  hideModal: () => {},
  showModal: () => {},
  modalState: { isOpen: false, onConfirm: () => {} },
  setModalState: () => {},
  productToEdit: undefined,
  setProductToEdit: () => {},
});

export interface ModalState {
  isOpen: boolean;
  onConfirm: () => void;
}
