import axios from "axios";
import OrderDal from "../Dal/OrderDal";
import {
  Client,
  OrderItem,
  PaymentFormResponse,
} from "../utils/interfaces/IOrder";
import {
  checkToken,
  getCheckoutFormPayload,
  requestNewToken,
} from "../utils/middleware/paymentMethod";
import env from "dotenv";

env.config();
const pluginId = process.env.MORNING_PLUGIN_ID as string;
let MORNING_TOKEN = {
  token : "",
  expiresAt: Date.now()
};
const url = process.env.MORNING_PAYMENT_FORM_URL as string;
export class OrderService {
  private orderDal: OrderDal;
  constructor(orderDal: OrderDal) {
    this.orderDal = orderDal;
  }
  async getPaymentForm(
    userInfo: Client,
    products: OrderItem[],
    totalPrice: number
  ): Promise<PaymentFormResponse> {
    // check if token is expired
    MORNING_TOKEN =  await checkToken(MORNING_TOKEN.token, MORNING_TOKEN.expiresAt)
    // save order information to Database
    const newOrderId = await this.orderDal.addOrder(
      userInfo,
      products,
      totalPrice
    );
    const formPayload = getCheckoutFormPayload(
      "payment form",
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
        throw new Error(`HTTP error! status: ${status}`);
      }
      return data as PaymentFormResponse;
    } catch (error) {
      console.log("Payment gateway error: ", error);
      throw new Error("Error sending form payload" + error);
    }
  }
}
