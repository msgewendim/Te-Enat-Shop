import { useQuery, useMutation } from "@tanstack/react-query";

import {
  MinimalCartItem,
  PaymentFormSuccessResponse,
  CheckoutPayload,
} from "../client/types.gen";
import { getItemsByNames, getPaymentForm } from "../lib";
import {
  getRandomItems,
  getRelatedItems,
} from "../lib/GenericService";
import { query } from "../providers/interface/context";

function useGetRelatedItems<T>(endpoint: string, exclude: string, query?: query) {
  return useQuery<T[], Error>({
    queryKey: [endpoint, "related", query],
    queryFn: () => getRelatedItems<T>(endpoint, query || {}, exclude),
    
    // Enhanced caching for related items
    staleTime: 8 * 60 * 1000, // 8 minutes  
    gcTime: 25 * 60 * 1000, // 25 minutes
    
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    
    placeholderData: (previousData) => previousData,
  });
}

function useGetRandomItems<T>(endpoint: string, query: query) {
  return useQuery<{ items: T[], currentPage: number, totalPages: number }, Error>({
    queryKey: [endpoint, 'random', query],
    queryFn: () => getRandomItems<T>(endpoint, query),
    
    // Enhanced caching for random items - 15 minutes fresh
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// Enhanced caching for cart items by names
function useGetCartItems(names: string[]) {
  return useQuery<MinimalCartItem[], Error>({
    queryKey: ["cart", "items", names.sort()],
    queryFn: () => getItemsByNames(names),
    enabled: names.length > 0,
    
    // Cart items can be cached for a short time since they're user-specific
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    
    refetchOnWindowFocus: false,
  });
}

// Enhanced caching for payment forms - now accepts CheckoutPayload
function useGetPaymentForm() {
  return useMutation<PaymentFormSuccessResponse, Error, CheckoutPayload>({
    mutationFn: (payload) => getPaymentForm(payload),
    
    // Payment operations don't need caching but should retry once
    retry: 1,
  });
}

function useGetItemsByNames<T>(names: string[]) {
  return useQuery<T[], Error>({
    queryKey: ["items", names],
    queryFn: () => getItemsByNames(names),
  });
}
export {
  useGetRelatedItems,
  useGetRandomItems,
  useGetCartItems,
  useGetPaymentForm,
  useGetItemsByNames,
};
