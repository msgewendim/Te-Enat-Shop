import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { query } from "../providers/interface/context";
import {
  PaymentFormPayload,
  RandomItemsResponse,
  SuccessResponse,
} from "../client/types.gen";
import {
  getRandomItems,
  getRelatedItems,
} from "../providers/api/GenericService";
import { getItemsByNames, getPaymentForm } from "../providers/api";

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
    },
    onError: (error) => {
      console.error("Failed to fetch payment form", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useGetItemsByNames(names: string[]) {
  return useQuery<SuccessResponse, Error>({
    queryKey: ["items from recipe", names],
    queryFn: () => getItemsByNames(names),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
}
export {
  useGetRelatedItems,
  useGetPaymentFormMutation,
  useGetRandomItems,
  useGetItemsByNames,
};