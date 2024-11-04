import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  getPaymentForm,
  getProductById,
  getProducts,
  getRandomProducts,
  getRelatedItems,
  updateProduct,
} from "../providers/apiFunctionsProducts";
import { query } from "../providers/interface/context";
import { PaymentFormPayload, Product } from "../client";

function useGetProducts(query: query) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

function useGetRandomProducts(query: query) {
  return useQuery({
    queryKey: ["randomProducts", "topProducts", query],
    queryFn: () => getRandomProducts<Product>(query),
    placeholderData: (previousData) => previousData,
  });
}
function useGetRelatedItems(query: query) {
  return useQuery({
    queryKey: ["relatedProducts", query],
    queryFn: () => getRelatedItems(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}
function useGetProductById(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
}

function useAddProductMutation() {
  return useMutation({
    mutationFn: (productData: Partial<Product>) => addProduct(productData),
    onSuccess: (data) => {
      console.log("Product added successfully", data);
    },
    onError: (error) => {
      console.error("Failed to add product", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useDeleteProductMutation() {
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: (data) => {
      console.log("Product deleted successfully", data);
    },
    onError: (error) => {
      console.error("Failed to delete product", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

type UpdateProductProps = {
  productId: string;
  productData: Partial<Product>;
};
function useUpdateProductMutation() {
  return useMutation({
    mutationFn: (data: UpdateProductProps) =>
      updateProduct(data.productId, data.productData),
    onSuccess: (data) => {
      console.log("Product updated successfully", data);
    },
    onError: (error) => {
      console.error("Failed to update product", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
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

export {
  useGetProducts,
  useGetProductById,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetPaymentFormMutation,
  useUpdateProductMutation,
  useGetRandomProducts,
  useGetRelatedItems,
};
