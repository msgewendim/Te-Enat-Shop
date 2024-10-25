import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  getPaymentForm,
  getProductById,
  getProducts,
  getRandomProducts,
  updateProduct,
} from "../providers/apiFunctions";
import { query } from "../providers/interface/context";
import { PaymentFormPayload, Product } from "../client";

const useGetProducts = (query: query) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
  });
};

// const useGetRandomProducts = (query: query) => {
//   return useInfiniteQuery({
//     queryKey: ["randomProducts", query],
//     queryFn: () => getRandomProducts(query),
//     placeholderData: (previousData) => previousData,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, _, lastPageParam) => {
//       if (!lastPage.hasMore) {
//         return undefined;
//       }
//       return lastPageParam + 1;
//     },
//     getPreviousPageParam: (_, __, firstPageParam) => {
//       if (firstPageParam <= 1) {
//         return undefined;
//       }
//       return firstPageParam - 1;
//     },
//   });
// };
const useGetRandomProducts = (query: query) => {
  return useQuery({
    queryKey: ["randomProducts", "topProducts", query],
    queryFn: () => getRandomProducts(query),
    placeholderData: (previousData) => previousData,
  });
};

const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};

const useAddProductMutation = () => {
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
};

const useDeleteProductMutation = () => {
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
};

type UpdateProductProps = {
  productId: string;
  productData: Partial<Product>;
};
const useUpdateProductMutation = () => {
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
};

const useGetPaymentFormMutation = () => {
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
};

export {
  useGetProducts,
  useGetProductById,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetPaymentFormMutation,
  useUpdateProductMutation,
  useGetRandomProducts,
};
