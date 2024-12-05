import { axiosInstance } from ".";
import { RandomItemsResponse, SuccessResponse } from "../../client/types.gen";
import { query } from "../interface/context";

// Fetch data from your API endpoint with the provided query
export const getItems = async <T>(endpoint: string, q: query): Promise<T[]> => {
  const data = (await axiosInstance.get(endpoint, { params: q })).data;
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// Fetch data from your API endpoint with the provided ID
export const getItemById = async <T>(
  endpoint: string,
  id: string
): Promise<T> => {
  const data = (await axiosInstance.get(`${endpoint}/${id}`)).data;
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

// Add a new item to the API endpoint
export const addItem = async <T>(
  endpoint: string,
  itemData: Partial<T>,
  token: string
): Promise<T> => {
  const data = (
    await axiosInstance.post(endpoint, itemData, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
    await axiosInstance.put(`${endpoint}/${id}`, itemData, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
    await axiosInstance.delete(`${endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
  if (data.success) {
    return;
  }
  throw new Error(data.message);
};

export const getRandomItems = async (
  endpoint: string,
  q: query
): Promise<RandomItemsResponse> => {
  const data = (
    await axiosInstance.get<RandomItemsResponse>(endpoint, {
      params: q,
    })
  ).data;
  if (data.success) {
    return data;
  }
  throw new Error(data.message);
};

export const getRelatedItems = async (
  endpoint: string,
  q: query,
  exclude: string
): Promise<SuccessResponse> => {
  const data = (
    await axiosInstance.get(endpoint, { params: { ...q, exclude } })
  ).data;
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};
