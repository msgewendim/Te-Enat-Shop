import axios from "axios";
import { PAYPLUS_API_KEY, PAYPLUS_API_SECRET_KEY, PAYPLUS_DEV_API_URL,PAYPLUS_PROD_API_URL  } from "../config/env.config";

const isProduction = process.env.NODE_ENV === "production";
const axiosInstance = axios.create({
  baseURL: isProduction ? PAYPLUS_PROD_API_URL : PAYPLUS_DEV_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  config.headers["api-key"] = PAYPLUS_API_KEY;
  config.headers["secret-key"] = PAYPLUS_API_SECRET_KEY;
  return config;
});

axiosInstance.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  return Promise.reject(error);
});

export default axiosInstance;