import {
  ClientDetails,
  OrderItem,
  OrderTransaction,
} from "../../../types/order.types";

export interface IOrder<T> {
  addOrder(
    userInfo: ClientDetails,
    products: OrderItem[],
    totalPrice: number
  ): void;
  updatePaymentStatus(id: string, orderTransaction: OrderTransaction): void;
  getOrderById(id: string): Promise<T | null>;
}
