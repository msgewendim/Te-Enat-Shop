import axios from "axios";
import { PAYPLUS_API_KEY, PAYPLUS_API_SECRET_KEY, PAYPLUS_PROD_API_URL  } from "../config/env.config";

// Ensure we always have a valid baseURL, even if the environment variable is missing
const DEFAULT_PAYPLUS_API_URL = "https://restapi.payplus.co.il/api/v1.0";
const baseURL = PAYPLUS_PROD_API_URL || DEFAULT_PAYPLUS_API_URL;

const axiosInstance = axios.create({
  baseURL,
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