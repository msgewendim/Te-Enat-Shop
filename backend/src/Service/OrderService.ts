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
  updatePaymentStatus,
} from "../Dal/OrderDal";
import { clearCart } from "../Dal/UserDal";

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
    const config = {
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
      const { status, data } = await axios.request(config);
      if (status >= 400) {
        console.log("Failed to fetch payment gateway", status);
        throw new Error(`Internal server Error: ${status}`);
      }
      return { ...data, orderId: newOrderId.toString() } as PaymentFormResponse;
    } catch (error: any) {
      console.log("Payment gateway error: ", error.message);
      throw new Error("Error sending form payload" + error.message);
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
    await updatePaymentStatus(orderId as string, transactionData);
  }
}
