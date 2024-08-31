import axios from "axios";
import OrderDal from "../Dal/OrderDal";
import { Client, OrderItem, PaymentFormResponse } from "../utils/interfaces/IOrder";
import { getCheckoutFormPayload } from "../utils/middleware/paymentMethod";
import env from "dotenv";

env.config();
const pluginId = process.env.MORNING_PLUGIN_ID as string;
const token = process.env.MORNING_TOKEN as string;
const url = process.env.MORNING_PAYMENT_FORM_URL as string;
// console.log(pluginId, "pluginId");
export class OrderService {
  private orderDal: OrderDal;
  constructor(orderDal: OrderDal) {
    this.orderDal = orderDal;
  }

  async addOrder(order: OrderItem): Promise<void> {}
  async updateOrder(order: OrderItem): Promise<void> {}

  async getPaymentForm(
    userInfo: Client,
    products: OrderItem[],
    totalPrice: number
  ): Promise<PaymentFormResponse> {
    const formPayload = getCheckoutFormPayload(
      "payment form",
      totalPrice,
      pluginId,
      userInfo,
      products,
      "Special Order"
    );
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    // console.log("Checkout form payload", formPayload);
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(formPayload),
    };
    // Send form payload to payment gateway
    try {
      console.log("Payment gateway try block");
      const response = await axios.request(config);
      const { status, data } = response;

      if (status >= 400) {
        console.log("Failed to fetch payment gateway", status);
        throw new Error(`HTTP error! status: ${status}`);
      }
      console.log(data, "response data ");
      return data;
    } catch (error) {
      console.log("Payment gateway error: ", error);
      throw new Error("Error sending form payload" + error);
    }
  }
}
