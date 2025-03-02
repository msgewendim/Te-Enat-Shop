import {
  Customer,
  CartItem,
} from "../../types/order.types";
import {
  addOrder,
  checkPaymentStatus,
  getOrders,
  updatePaymentStatus,
} from "../Dal/OrderDal";
import { getPaymentLink, getPayplusGenLinkPayload } from "../utils/PaymentProvider/payplus.config";
import { SimplifiedTransaction } from "../utils/PaymentProvider/types";

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
  async updatePaymentStatus(transactionInfo: SimplifiedTransaction) {
    const { added_info: orderId, ...transactionData } = transactionInfo;
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

  async getPaymentLink(orderItems: CartItem[], customer: Customer, totalPrice: number) {
    try {
      const orderId = await addOrder(customer, orderItems, totalPrice);
      const generatePaymentLinkPayload = getPayplusGenLinkPayload(
        orderItems, 
        customer, 
        totalPrice, 
        orderId
      );
      const response = await getPaymentLink(generatePaymentLinkPayload);
      
      // Validate response
      if (!response.data.payment_page_link) {
        throw new Error('Invalid payment link response from PayPlus');
      }

      // Return only the payment URL
      return response.data.payment_page_link;
      
    } catch (error) {
      throw error;
    }
  }
}
