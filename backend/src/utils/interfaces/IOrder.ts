import {
  Customer,
  CartItem,
  OrderTransaction,
} from "../../../types/order.types";

export interface IOrder<T> {
  addOrder(
    userInfo: Customer,
    products: CartItem[],
    totalPrice: number
  ): void;
  updatePaymentStatus(id: string, orderTransaction: OrderTransaction): void;
  getOrderById(id: string): Promise<T | null>;
}
