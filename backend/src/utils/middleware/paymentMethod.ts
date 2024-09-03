import axios from "axios";
import { Client, OrderItem, PaymentFormPayload } from "../interfaces/IOrder";
import env from "dotenv";
env.config();
export const getCheckoutFormPayload = (
  invoiceDescription: string,
  totalPrice: number,
  pluginId: string,
  clientDetails: Client,
  income: OrderItem[],
  custom: string
): PaymentFormPayload => {
  // const {name, address, add, email, city, mobile, taxId="33245984", zip} = clientDetails
  return {
    description: invoiceDescription,
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
      taxId: "332459841",
      add: true,
      country: "IL",
    },
    income: income,
    remarks: "",
    // successUrl: "https://te-enat-shop.onrender.com/",
    // failureUrl: "https://te-enat-shop.onrender.com/error",
    // notifyUrl: "https://te-enat-shop.onrender.com/notify", // TODO: replace with your notify URL  // notifyUrl: "https://your-domain.com/notify",  // TODO: replace with your notify URL  // notifyUrl: "https://your-domain.com/notify",  // TODO: replace with your notify URL
    custom: custom,
  };
};

export const requestNewToken = async () => {
  const url = "https://sandbox.d.greeninvoice.co.il/api/v1/account/token";
  const body = {
    id: process.env.MORNING_API_KEY as string,
    secret: process.env.MORNING_SECRET_KEY as string,
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
      throw new Error(`HTTP error! status: ${status}`);
    }
    process.env.MORNING_TOKEN = data.token;
    return {
      token: data.token,
      expiresAt: Date.now() + data.expires * 1000, // convert to milliseconds 1 hour
    };
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
export const checkToken = async (token: string, expiresAt: number) => {
  if (!token || Date.now() >= expiresAt) {
    return await requestNewToken();
  }else{
    return { token, expiresAt };
  }
};


