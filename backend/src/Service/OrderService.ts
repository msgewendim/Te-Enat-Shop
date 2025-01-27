import axios from "axios";
import {
  generateSaleUrl,
  getCheckoutFormPayload,
  getGenerateSalePayload,
} from "../utils/middleware/createPayPage";
import {
  ClientDetails,
  OrderItem,
  OrderTransaction,
  PaymentFormResponse,
} from "../../types/order.types";
import {
  addOrder,
  checkPaymentStatus,
  getOrders,
  updatePaymentStatus,
} from "../Dal/OrderDal";
import {  ExternalServiceError } from "../utils/customErrors";

const pluginId = "";
let MORNING_TOKEN = {
  token: "",
  expiresAt: Date.now(),
};
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

  async generateSale(orderItems: OrderItem[]) {
    try {
      // const newOrderId = await addOrder(userInfo, products, 0);
      // add orderId to transaction info
      const generateSalePayload = getGenerateSalePayload(orderItems, "hhhja");
      console.log("generateSalePayload", generateSalePayload);
      const saleUrl = await generateSaleUrl(generateSalePayload);
      console.log("saleUrl", saleUrl);
      return saleUrl;
    } catch (error) {
      throw error;
    }
  }
}
