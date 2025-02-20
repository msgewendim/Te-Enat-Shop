import {
  ClientDetails,
  OrderItem,
  OrderTransaction,
} from "../../types/order.types";
import {
  checkPaymentStatus,
  getOrders,
  updatePaymentStatus,
} from "../Dal/OrderDal";
import { getPaymentLink, getPayplusGenLinkPayload } from "../utils/PaymentProvider/payplus.config";

const url = "MORNING_PAYMENT_FORM_URL";
export class OrderService {
  async checkPaymentStatus(orderId: string) {
    try {
      const paymentStatus = await checkPaymentStatus(orderId);
      return paymentStatus;
    } catch (error) {
      throw new Error(`Error checking payment status for Order ${orderId}`);
    }
  }
  async updatePaymentStatus(transactionInfo: OrderTransaction) {
    const { external_data: orderId, ...transactionData } = transactionInfo;
    // update payment status in database
    try {
      await updatePaymentStatus(orderId as string, transactionData);
    } catch (error) {
      throw error;
    }
  }
  async getOrders(limit: number, page: number) {
    const orders = await getOrders(limit, page);
    return orders;
  }

  async getPaymentLink(orderItems: OrderItem[], clientDetails: ClientDetails, totalPrice: number) {
    try {
      // const newOrderId = await addOrder(userInfo, products, 0);
      // add orderId to transaction info
      const generatePaymentLinkPayload = getPayplusGenLinkPayload(orderItems, clientDetails, totalPrice, "THIS IS A TEST PAYMENT");
      console.log("generatePaymentLinkPayload", generatePaymentLinkPayload);
      const paymentLink = await getPaymentLink(generatePaymentLinkPayload);
      console.log("paymentLink", paymentLink);
      return paymentLink;
    } catch (error) {
      throw error;
    }
  }
}
