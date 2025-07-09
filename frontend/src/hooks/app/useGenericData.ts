import { useMutation, useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";

import { query } from "../../providers/interface/context";
import useAuth from "../auth/useAuth";
import { addItem, deleteItem, getItemById, getItems, getRandomItems, getRelatedItems, updateItem } from "../../lib/GenericService";

const endpointWithSlash = (endpoint: string) => endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

function useGenericData<T>(endpoint: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // Enhanced caching for main data listings (shop, recipes, packages)
  const useGetItems = (q: query) => {
    const queryKey: QueryKey = [endpoint.replace(/^\//, ''), q];
    return useQuery<T[], Error>({
      queryKey,
      queryFn: () => getItems<T>(endpoint, q),
      
      // Shop/recipes/packages data stays fresh for 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Keep in cache for 20 minutes before garbage collection
      gcTime: 20 * 60 * 1000, // 20 minutes
      
      // Don't refetch on window focus - user requested to avoid calls on route changes
      refetchOnWindowFocus: false,
      
      // Only refetch on reconnect if data is stale
      refetchOnReconnect: 'always',
      
      // Keep previous data during navigation to avoid loading states
      placeholderData: (previousData) => previousData,
    });
  };

  // Enhanced caching for individual items
  const useGetItemById = (itemId: string) => {
    const queryKey: QueryKey = [endpoint.replace(/^\//, ''), itemId];
    return useQuery<T, Error>({
      queryKey,
      queryFn: () => getItemById<T>(endpoint, itemId),
      enabled: !!itemId,
      
      // Individual items can be cached longer since they change less frequently
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useAddItemMutation = () => {
    return useMutation<T, Error, Partial<T>>({
      mutationFn: async (itemData) => addItem<T>(endpointWithSlash(endpoint), itemData, await getToken()),
      onSuccess: (data) => {
        // Invalidate and refetch items list after adding
        queryClient.invalidateQueries({ queryKey: [endpoint.replace(/^\//, '')] });
        console.log(`${endpoint} added successfully`, data);
      },
      onError: (error) => console.error(`Failed to add ${endpoint}`, error),
    });
  };

  const useUpdateItemMutation = () => {
    return useMutation<T, Error, { itemId: string; itemData: Partial<T> }>({
      mutationFn: async ({ itemId, itemData }) => updateItem<T>(endpointWithSlash(endpoint), itemId, itemData, await getToken()),
      onSuccess: (data, variables) => {
        // Update specific item cache and invalidate lists
        queryClient.setQueryData([endpoint.replace(/^\//, ''), variables.itemId], data);
        queryClient.invalidateQueries({ queryKey: [endpoint.replace(/^\//, '')] });
        console.log(`${endpoint} updated successfully`, data);
      },
      onError: (error) => console.error(`Failed to update ${endpoint}`, error),
    });
  };

  const useDeleteItemMutation = () => {
    return useMutation<void, Error, string>({
      mutationFn: async (itemId) => deleteItem(endpointWithSlash(endpoint), itemId, await getToken()),
      onSuccess: (data, itemId) => {
        // Remove from cache and invalidate lists
        queryClient.removeQueries({ queryKey: [endpoint.replace(/^\//, ''), itemId] });
        queryClient.invalidateQueries({ queryKey: [endpoint.replace(/^\//, '')] });
        console.log(`${endpoint} deleted successfully`, data);
      },
      onError: (error) => console.error(`Failed to delete ${endpoint}`, error),
    });
  };

  // Enhanced caching for random items (used by legacy code)
  const useGetRandomItems = (endpoint: string, q: query) => {
    const queryKey: QueryKey = [endpoint.replace(/^\//, ''), 'random', q];
    return useQuery<{ items: T[], currentPage: number, totalPages: number }, Error>({
      queryKey,
      queryFn: () => getRandomItems<T>(endpoint, q),
      
      // Random items cached for 15 minutes
      staleTime: 15 * 60 * 1000, // 15 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
      
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  // Enhanced caching for related items
  const useGetRelatedItems = (exclude: string, q: query) => {
    return useQuery<T[], Error>({
      queryKey: [endpoint, "related", q],
      queryFn: async () => await getRelatedItems<T>(endpoint, q, exclude),
      
      // Related items can be cached for a moderate time
      staleTime: 8 * 60 * 1000, // 8 minutes
      gcTime: 25 * 60 * 1000, // 25 minutes
      
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
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