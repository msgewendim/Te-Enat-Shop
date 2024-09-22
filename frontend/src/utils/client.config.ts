import { createClient } from "@hey-api/client-fetch";
import { client } from "../client/services.gen";

// const NODE_MODE = import.meta.env.NODE_MODE as string;
// const API_URL =
//   NODE_MODE === "production"
//     ? (import.meta.env.VITE_API_URL_PRODUCTION as string)
//     : (import.meta.env.VITE_API_URL as string);
const API_URL = import.meta.env.VITE_API_URL_PRODUCTION
client.setConfig({
  baseUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  fetch,
});
export const localClient = createClient({
  baseUrl: API_URL,
  headers: {
    Authorization: "Bearer <token_from_local_client>",
    "Content-Type": "application/json",
  },
});
localClient.interceptors.request.use((req, options) => {
  if (options.url === "/products/{id}" && options.method === "GET") {
    req.headers.set("Authorization", "Bearer <token_from_interceptor>");
  }
  return req;
});
