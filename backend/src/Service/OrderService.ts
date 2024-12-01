import axios from "axios";
import {
  checkToken,
  getCheckoutFormPayload,
} from "../utils/middleware/paymentMethod";
import {
  ClientDetails,
  OrderItem,
  OrderTransaction,
  PaymentFormResponse,
} from "../../types/order.types";
import {
  MORNING_PAYMENT_FORM_URL,
  MORNING_PLUGIN_ID,
} from "../utils/config/env.config";
import {
  addOrder,
  checkPaymentStatus,
  getOrders,
  updatePaymentStatus,
} from "../Dal/OrderDal";
import { BadRequestError, ExternalServiceError } from "../utils/customErrors";

const pluginId = MORNING_PLUGIN_ID;
let MORNING_TOKEN = {
  token: "",
  expiresAt: Date.now(),
};
const url = MORNING_PAYMENT_FORM_URL;
export class OrderService {
  async getPaymentForm(
    userInfo: ClientDetails,
    products: OrderItem[],
    totalPrice: number
  ): Promise<PaymentFormResponse> {
    // check if token is expired && get new token if expired
    MORNING_TOKEN = await checkToken(
      MORNING_TOKEN.token,
      MORNING_TOKEN.expiresAt
    );
    // save order information to Database
    const newOrderId = await addOrder(userInfo, products, totalPrice);
    const formPayload = getCheckoutFormPayload(
      totalPrice,
      pluginId,
      userInfo,
      products,
      newOrderId.toString()
    );
    const requestConfig = {
      method: "POST",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MORNING_TOKEN.token}`,
      },
      data: JSON.stringify(formPayload),
    };
    try {
      // get payment form
      const { status, data } = await axios.request(requestConfig);
      if (status >= 400) {
        throw new ExternalServiceError(
          `Error fetching payment form: ${data.errorMessage}`
        );
      }
      return { ...data, orderId: newOrderId.toString() } as PaymentFormResponse;
    } catch (error: any) {
      throw new ExternalServiceError(
        `Error sending form payload: ${error.message}`
      );
    }
  }
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
}
