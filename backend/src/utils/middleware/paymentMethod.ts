import axios from "axios";
import { ClientDetails, OrderItem } from "../../../types/order.types";
import { PaymentFormPayload } from "../../../types/order.types";
import {
  BACKEND_APP_URL,
  BASE_URL_NGROK,
  MORNING_API_KEY,
  MORNING_SECRET_KEY,
  NODE_ENV,
} from "../config/env.config";
import { ExternalServiceError } from "../customErrors";

const BASE_URL_API =
  NODE_ENV === "production" ? BACKEND_APP_URL : BASE_URL_NGROK;

export const getCheckoutFormPayload = (
  totalPrice: number,
  pluginId: string,
  clientDetails: ClientDetails,
  income: OrderItem[],
  custom: string
): PaymentFormPayload => {
  return {
    description: "פירוט שירותים ופריטים",
    type: 320,
    lang: "he",
    currency: "ILS",
    vatType: 0,
    amount: totalPrice,
    maxPayments: 1,
    pluginId: pluginId as string,
    group: 100,
    client: {
      ...clientDetails,
      emails: clientDetails.emails,
      taxId: "332459841",
      add: true,
      country: "IL",
    },
    income: income,
    remarks: "",
    // successUrl: `${BASE_URL_API}/payment-success`,
    // failureUrl: `${BASE_URL_API}/payment_error`,
    notifyUrl: `${BASE_URL_API}/api/orders/notify`, // needs to be updated on deployment
    custom: custom,
  };
};

export const requestNewToken = async (token: string) => {
  const url = "https://sandbox.d.greeninvoice.co.il/api/v1/account/token";
  const body = {
    id: MORNING_API_KEY,
    secret: MORNING_SECRET_KEY,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: JSON.stringify(body),
    url,
  };
  try {
    const { data, status } = await axios.request(config);
    if (status >= 400) {
      throw new ExternalServiceError(`Error fetching token: ${data.error}`);
    }
    return {
      token: data.token,
      expiresAt: Date.now() + data.expires * 1000, // convert to milliseconds 1 hour
    };
  } catch (error) {
    throw error;
  }
};
export const checkToken = async (token: string, expiresAt: number) => {
  if (!token || Date.now() >= expiresAt) {
    return await requestNewToken(token);
  } else {
    return { token, expiresAt };
  }
};
