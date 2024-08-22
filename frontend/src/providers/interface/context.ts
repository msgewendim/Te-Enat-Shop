import { createContext } from "react";
import { CartItem, DeleteProductsByIdError, DeleteProductsByIdResponse, GetAllProductsError, GetProductError, GetProductResponse, PostProductsError, PostProductsResponse, Product, PutProductsByIdError, PutProductsByIdResponse } from "../../client/types.gen";

interface IContext {
  products: Product[];
  getProducts: () => Promise<GetProductResponse | GetAllProductsError>;
  getProductById: (id: string) => Promise<GetProductResponse | GetProductError>;
  addProduct: (
    productData: Partial<Product>
  ) => Promise<PostProductsResponse | PostProductsError>;
  updateProduct: (
    id: string,
    productData: Partial<Product>
  ) => Promise<PutProductsByIdResponse | PutProductsByIdError>;
  deleteProduct: (
    id: string
  ) => Promise<DeleteProductsByIdResponse | DeleteProductsByIdError>;
  category: string;
  page: number;
  filter: string;
  cartItems: CartItem[];
  totalPrice: number;
  setFilter: (filter: string) => void;
  setPage: (newPage: number) => void;
  setCategory: (newCategory: string) => void;
  setCartItems: (product: CartItem[]) => void;
}


export const AppContext = createContext<IContext>({
  products: [],
  getProducts: () => Promise.resolve([]),
  getProductById: () => Promise.resolve({}),
  addProduct: () => Promise.resolve(),
  updateProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
  category: "",
  page: 0,
  filter: "",
  cartItems: [],
  totalPrice: 0,
  setCartItems: () => { },
  setFilter: () => { },
  setPage: () => { },
  setCategory: () => { },
});