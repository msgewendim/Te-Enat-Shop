// const endpoint = "/products";

// import { Product } from "../../client/types.gen";
// import useGenericData from "../../hooks/app/useGenericData";

// const getProducts = async (q: query): Promise<Product[]> =>
//   getItems<Product>(endpoint, q);

// const getProductById = async (id: string): Promise<Product> =>
//   getItemById<Product>(endpoint, id);

// const addProduct = async (
//   productData: Partial<Product>,
//   token: string
// ): Promise<Product> => addItem<Product>(endpoint, productData, token);

// const updateProduct = async (
//   id: string,
//   productData: Partial<Product>,
//   token: string
// ): Promise<Product> => updateItem<Product>(endpoint, id, productData, token);

// const deleteProduct = async (id: string, token: string): Promise<void> =>
//   deleteItem(endpoint, id, token);

// const getRandomProducts = async <T>(
//   q: query
// ): Promise<RandomItemsResponse<T>> => {
//   return (
//     await axiosInstance.get("/products/top-products", {
//       params: q,
//     })
//   ).data;
// };

// const getRelatedItems = async (query: query): Promise<Product[] | Recipe[]> => {
//   return (
//     await axiosInstance.get(`/${query.type}`, {
//       params: { query },
//     })
//   ).data;
// };

// const {
//   useGetItems,
//   useGetItemById,
//   useAddItemMutation,
//   useUpdateItemMutation,
//   useDeleteItemMutation,
// } = useGenericData<Product>("/products");

// const getProducts = useGetItems;
// const getProductById = useGetItemById;
// const addProduct = useAddItemMutation;
// const updateProduct = useUpdateItemMutation;
// const deleteProduct = useDeleteItemMutation;

// export {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };
