import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { query } from "../providers/interface/context";
import {
  OrderItem,
  PaymentFormPayload,
  RandomItemsResponse,
} from "../client/types.gen";
import {
  getRandomItems,
  getItemsByNames,
  getRelatedItems,
} from "../providers/api/GenericService";
import { getPaymentForm, getPaymentLinkFormICount } from "../providers/api";

function useGetRelatedItems(endpoint: string, exclude: string, query?: query) {
  return useQuery({
    queryKey: [endpoint, "related", query],
    queryFn: () => getRelatedItems(endpoint, query || {}, exclude),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

function useGetRandomItems(endpoint: string, query: query) {
  return useQuery<RandomItemsResponse, Error>({
    queryKey: [endpoint, query],
    queryFn: () => getRandomItems(endpoint, query),
    placeholderData: keepPreviousData,
  });
}
function useGetPaymentFormMutation() {
  return useMutation({
    mutationFn: (formData: PaymentFormPayload) => getPaymentForm(formData),
    onSuccess: (data) => {
      console.log("Payment form fetched successfully", data);
      return data.data
    },
    onError: (error) => {
      console.error("Failed to fetch payment form", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useGetPaymentLinkMutation(){
  return useMutation({
    mutationFn: (orderItems: OrderItem[]) => getPaymentLinkFormICount(orderItems),
    onSuccess: (data) => {
      console.log("Payment form fetched successfully", data);
      return data.data
    },
    onError: (error) => {
      console.error("Failed to fetch payment form", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useGetItemsByNames(names: string[] | string, endpoint: string) {
  return useQuery({
    queryKey: ["items by names " + endpoint, names],
    queryFn: () => getItemsByNames(endpoint, names),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
}
export {
  useGetRelatedItems,
  useGetPaymentFormMutation,
  useGetRandomItems,
  useGetItemsByNames,
  useGetPaymentLinkMutation
};
