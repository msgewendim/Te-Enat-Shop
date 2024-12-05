import { useQuery, useMutation, QueryKey } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import { query } from "../../providers/interface/context";
import {
  addItem,
  deleteItem,
  getItemById,
  getItems,
  getRandomItems,
  getRelatedItems,
  updateItem,
} from "../../providers/api/GenericService";
import { RandomItemsResponse, SuccessResponse } from "../../client/types.gen";

function useGenericData<T>(endpoint: string) {
  const endpointWithSlash = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const endpointWithoutSlash = endpointWithSlash.startsWith('/') ? endpointWithSlash.slice(1) : endpointWithSlash;

  const { getToken } = useAuth();

  const useGetItems = (q: query) => {
    return useQuery<T[]>({
      queryKey: [endpointWithoutSlash, q],
      queryFn: () => getItems<T>(endpointWithSlash, q),
      placeholderData: (previousData) => previousData,
      staleTime: 5000,
    });
  };

  const useGetItemById = (id: string) => {
    return useQuery<T>({
      queryKey: [endpointWithoutSlash, id],
      queryFn: () => getItemById<T>(endpointWithSlash, id),
    });
  };

  const useAddItemMutation = () => {
    return useMutation<T, Error, Partial<T>>({
      mutationFn: async (itemData) => addItem<T>(endpointWithSlash, itemData, await getToken()),
      onSuccess: (data) => console.log(`${endpoint} added successfully`, data),
      onError: (error) => console.error(`Failed to add ${endpoint}`, error),
    });
  };

  const useUpdateItemMutation = () => {
    return useMutation<T, Error, { itemData: Partial<T>; itemId: string }>({
      mutationFn: async ({ itemData, itemId }) => updateItem<T>(endpointWithSlash, itemId, itemData, await getToken()),
      onSuccess: (data) => console.log(`${endpoint} updated successfully`, data),
      onError: (error) => console.error(`Failed to update ${endpoint}`, error),
    });
  };

  const useDeleteItemMutation = () => {
    return useMutation<void, Error, string>({
      mutationFn: async (itemId) => deleteItem(endpointWithSlash, itemId, await getToken()),
      onSuccess: (data) => console.log(`${endpoint} deleted successfully`, data),
      onError: (error) => console.error(`Failed to delete ${endpoint}`, error),
    });
  };

  const useGetRandomItems = (endpoint: string, q: query) => {
    const queryKey: QueryKey = [endpoint.replace(/^\//, ''), 'random', q];
    return useQuery<RandomItemsResponse, Error>({
      queryKey,
      queryFn: () => getRandomItems(endpoint, q),
    });
  };

  const useGetRelatedItems = (exclude: string, q: query) => {
    return useQuery<SuccessResponse, Error>({
      queryKey: [endpoint, "related", q],
      queryFn: async () => await getRelatedItems(endpoint, q, exclude),
      placeholderData: (previousData) => previousData,
      staleTime: 5000,
    });
  };

  return {
    useGetItems,
    useGetItemById,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useGetRandomItems,
    useGetRelatedItems,
  };
}
export default useGenericData;