import { query } from "./interface/context";
import axios from "axios";
import { BASE_API_URL } from "../utils/env.config";
import {
  CartItem,
  GetOrdersPaymentStatusResponse,
  PaymentFormPayload,
  PaymentFormSuccessResponse,
  Product,
} from "../client";

const axiosInstance = axios.create({ baseURL: BASE_API_URL });

const fetchProducts = async (q: query) => {
  return (await axios("/products?cursor=" + q.page)).data;
};
const getProducts = async (q: query): Promise<Product[]> => {
  // Fetch data from your API endpoint with the provided query
  return (await axiosInstance.get("/products?cursor=" + q.page, { params: q }))
    .data;
};

const getProductById = async (id: string): Promise<Product> => {
  // Fetch data from your API endpoint with the provided ID
  return await axiosInstance.get(`/products/${id}`);
};

const addProduct = async (productData: Partial<Product>): Promise<Product> => {
  // Create a new product in your API endpoint with the provided data
  return (await axiosInstance.post("/products", productData)).data;
};

const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  // Update the product with the provided ID in your API endpoint with the provided data
  return (await axiosInstance.put(`/products/${id}`, productData)).data;
};

const deleteProduct = async (id: string): Promise<void> => {
  // Delete the product with the provided ID from your API endpoint
  await axiosInstance.delete(`/products/${id}`);
};

const getPaymentForm = async (
  formData: PaymentFormPayload
): Promise<PaymentFormSuccessResponse> => {
  // Send the form data to your payment gateway API
  return (
    await axiosInstance.post(`/orders/v1/payments/form`, {
      formData,
    })
  ).data;
};

const checkPaymentStatus = async (
  orderId: string
): Promise<GetOrdersPaymentStatusResponse> => {
  // Check the payment status with the provided order ID in your payment gateway API
  return (
    await axiosInstance.get(`/orders/payments/status`, {
      params: { orderId },
    })
  ).data;
};

const addToCart = async (cartItem: CartItem, userId: string) => {
  // Add the product to the user's cart in your API endpoint
  return await axiosInstance.post(`/orders/${userId}/cart`, cartItem, {});
};
const removeFromCart = async (cartItem: CartItem, userId: string) => {
  // Add the product to the user's cart in your API endpoint
  return await axiosInstance.delete(`/orders/${userId}/cart/`, {
    data: cartItem,
  });
};

export {
  removeFromCart,
  getProducts,
  addToCart,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getPaymentForm,
  checkPaymentStatus,
  fetchProducts,
};
