import { createContext, ReactNode, useEffect, useState } from "react";
import { deleteProductsById, DeleteProductsByIdError, DeleteProductsByIdResponse, getAllProducts, GetAllProductsError, getProduct, GetProductError, GetProductResponse, postProducts, PostProductsError, PostProductsResponse, Product, putProductsById, PutProductsByIdError, PutProductsByIdResponse } from "../client";
import { client } from '../client';
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
});
client.interceptors.response.use((response) => {
  if (response.status === 200) {
    console.log(`request to ${response.url} was successful`);
  }
  return response;
});
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const getProducts = async () => {
    // fetch(`${API_URL}/products?${page ? `page=${page}` : ""}&${category ? `category=${category}` : ""}&${filter ? `filter=${filter}` : ""}`, { method: 'GET' }
    try {
      const products = await getAllProducts({
        client: client,
        query: {
          page: page,
          category: category,
          filter: filter,
        }
      })
      const { data, response, error } = products
      if (response.ok === false) {
        console.log(error);
        throw new Error(`Field to fetch products status: ${response.status}`);
      }
      setProducts(data as Product[])
      return products
    } catch (error) {
      console.info(error)
    }
  }
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, category])

  const getProductById = async (id: string) => {
    try {
      // const product = await fetch(`${API_URL}/products/${id}`, { method: 'GET' })
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
      // const { categories, name, price, images, rate, shortDescription, weights, benefits, InStock, availability, totalSales, reviews, } = productData
      // const newProduct = {
      //   body: productData as Product
      // }
      // const response = await fetch(`${API_URL}/products`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newProduct)
      // })
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
      // const response = await fetch(`${API_URL}/products/${productId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // })
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

      // const response = await fetch(`${API_URL}/products/${productId}`, {
      //   method: "PUT",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(productData)
      // });
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