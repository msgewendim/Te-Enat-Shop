import axios, { type AxiosRequestConfig } from "axios";

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Create a custom axios instance
const api = axios.create({
  baseURL: import.meta.env['VITE_API_URL'],
  timeout: 10000,
});

// Request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // 100ms between requests

api.interceptors.request.use(async (config) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return config;
});

// Response interceptor for handling rate limiting and auth/error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Handle rate limiting (429)
    if (response?.status === 429 && !config._isRetry) {
      config._isRetry = true;
      config._retryCount = (config._retryCount || 0) + 1;

      if (config._retryCount <= 3) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = 1000 * Math.pow(2, config._retryCount - 1);
        await sleep(delay);
        return api(config);
      }
    }

    // Handle authentication/error codes globally
    if (response) {
      if (response.status === 401) {
        localStorage.clear();
      }
      // You may want to handle other status codes here if needed
      // For now, just forward the error
    }

    return Promise.reject(error);
  }
);

// Utils using the custom api instance

const withAuth = (
  token: string | null,
  config: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  if (!token) return config
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
}

const postUtil = (
  url: string,
  data: any,
  token: string | null = null,
  config: AxiosRequestConfig = {}
) => api.post(url, data, withAuth(token, config))

const patchUtil = (
  url: string,
  data: any,
  token: string | null = null,
  config: AxiosRequestConfig = {}
) => api.patch(url, data, withAuth(token, config))

const getUtil = (
  url: string,
  token: string | null = null,
  config: AxiosRequestConfig = {}
) => api.get(url, withAuth(token, config))

const deleteUtil = (
  url: string,
  token: string | null = null,
  config: AxiosRequestConfig = {}
) => api.delete(url, withAuth(token, config))

export { postUtil, getUtil, patchUtil, deleteUtil }
