import { createContext, ReactNode, useEffect, useState } from "react";
import { DeleteProductsByIdError, DeleteProductsByIdResponse, GetAllProductsError, GetProductError, GetProductResponse, PostProductsError, PostProductsResponse, Product, PutProductsByIdError, PutProductsByIdResponse } from "../client/types.gen";
import { createClient } from '@hey-api/client-fetch';
import { client, deleteProductsById, getAllProducts, getProduct, postProducts, putProductsById } from '../client/services.gen';

const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:3005/api";

interface IContext {
  products: Product[]
  getProducts: () => Promise<GetProductResponse | GetAllProductsError>
  getProductById: (id: string) => Promise<GetProductResponse | GetProductError>
  addProduct: (productData: Partial<Product>) => Promise<PostProductsResponse | PostProductsError>
  updateProduct: (id: string, productData: Partial<Product>) => Promise<PutProductsByIdResponse | PutProductsByIdError>
  deleteProduct: (id: string) => Promise<DeleteProductsByIdResponse | DeleteProductsByIdError>
  category: string
  page: number
  filter: string
  setFilter: (filter: string) => void
  setPage: (newPage: number) => void
  setCategory: (newCategory: string) => void
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
  setFilter: () => { },
  setPage: () => { },
  setCategory: () => { },
});
client.setConfig({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  fetch,
});
const localClient = createClient({
  baseUrl: 'http://localhost:3005/api',
  headers: {
    Authorization: 'Bearer <token_from_local_client>',
    'Content-Type': 'application/json',
  },
})
localClient.interceptors.request.use((req, options) => {
  if (
    options.url === '/products/{id}' &&
    options.method === 'GET'
  ) {
    req.headers.set('Authorization', 'Bearer <token_from_interceptor>');
  }
  return req
})
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const getProducts = async () => {
    try {
      const { data, response } = await getAllProducts({
        client: localClient,
        query: {
          page: page,
          category: category,
          filter: filter,
        }
      })
      if (response.ok === false) {
        throw new Error(`Field to fetch products status: ${response.status}`);
      }
      setProducts(data as Product[])
      return products
    } catch (error) {
      console.info(error)
    }
  }

  const getProductById = async (id: string) => {
    try {
      const product = await getProduct({
        client: client,
        path: {
          id: id,
        }
      })
      const { data, response } = product
      if (!response.ok) throw new Error(`Error fetch product ${id} from ${API_URL}`)
      return data;
    } catch (error) {
      console.info(error)
    }
  }

  const addProduct = async (productData: Partial<Product>) => {
    try {
      const product = await postProducts({
        client: client,
        body: productData as Product
      })
      const { response } = product
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await getProducts()
    } catch (error) {
      console.info(error)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const product = await deleteProductsById({
        client: client,
        path: {
          id: productId,
        }
      })
      const { response } = product;
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await getProducts()
    } catch (error) {
      console.info(error)
    }
  }

  const updateProduct = async (productId: string, productData: Partial<Product>) => {
    try {
      const product = await putProductsById({
        client: client,
        path: {
          id: productId,
        },
        body: productData as Product
      })
      const { response } = product;
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await getProducts()
    } catch (error) {
      console.info(error);
    }
  }

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, category])
  
  const values = {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    setFilter,
    setPage,
    setCategory,
    products,
    API_URL,
    page,
    filter,
    category,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;