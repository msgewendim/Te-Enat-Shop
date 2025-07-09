import { deleteUtil, getUtil, postUtil, patchUtil } from "./api";
import { query } from "../providers/interface/context";

// Fetch data from your API endpoint with the provided query
// Standardized: Regular endpoints return T[] directly
export const getItems = async <T>(endpoint: string, q: query): Promise<T[]> => {
  const response = await getUtil(endpoint, undefined, { params: q });
  const data = response.data;
  
  // Standardized: All regular endpoints return direct arrays T[]
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error(`Expected array response from ${endpoint}, got ${typeof data}`);
};

// Fetch data from your API endpoint with the provided ID
export const getItemById = async <T>(
  endpoint: string,
  id: string
): Promise<T> => {
  const response = await getUtil(`${endpoint}/${id}`);
  const data = response.data;
  
  // Handle both wrapped and direct responses
  if (data && typeof data === 'object') {
    // If response has success wrapper format
    if ('success' in data && data.success) {
      return data.data as T;
    }
    // If response is direct object (current API format)
    else if ('_id' in data) {
      return data as T;
    }
  }
  
  throw new Error(`Invalid response format from ${endpoint}/${id}`);
};

// Add a new item to the API endpoint
export const addItem = async <T>(
  endpoint: string,
  itemData: Partial<T>,
  token: string
): Promise<T> => {
  const data = (
    await postUtil(endpoint, itemData, token)
  ).data;
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// Update an existing item in the API endpoint
export const updateItem = async <T>(
  endpoint: string,
  id: string,
  itemData: Partial<T>,
  token: string
): Promise<T> => {
  const data = (
    await patchUtil(`${endpoint}/${id}`, itemData, token)
  ).data;
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// Delete an item from the API endpoint
export const deleteItem = async (
  endpoint: string,
  id: string,
  token: string
): Promise<void> => {
  const data = (
    await deleteUtil(`${endpoint}/${id}`, token)
  ).data;
  if (data.success) {
    return;
  }
  throw new Error(data.message);
};

// Standardized: Random/Top endpoints return { items: T[], currentPage: number, totalPages: number }
export const getRandomItems = async <T>(
  endpoint: string,
  q: query
): Promise<{ items: T[], currentPage: number, totalPages: number }> => {
  const response = await getUtil(endpoint, undefined, { params: q });
  const data = response.data;
  
  // Standardized format: { items: T[], currentPage: number, totalPages: number }
  if (data && typeof data === 'object' && 'items' in data && Array.isArray(data.items)) {
    return {
      items: data.items,
      currentPage: data.currentPage || 1,
      totalPages: data.totalPages || 1
    };
  }
  
  throw new Error(`Expected {items, currentPage, totalPages} format from ${endpoint}`);
};

// Standardized: Related items endpoints return T[] directly
export const getRelatedItems = async <T>(
  endpoint: string,
  q: query,
  exclude: string
): Promise<T[]> => {
  const response = await getUtil(endpoint, undefined, { params: { ...q, exclude } });
  const data = response.data;
  
  // Standardized: Related items return direct arrays T[]
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error(`Expected array response from related ${endpoint}`);
};
