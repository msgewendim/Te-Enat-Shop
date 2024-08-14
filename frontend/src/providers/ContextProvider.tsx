import { createContext, ReactNode, useEffect, useState } from "react";
import { Product } from "../../../types/product.types";

const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:3005/api";

interface IContext {
  products: Product[]
  getProducts: () => Promise<Partial<Product[]>>
  getProductById: (id: string) => Promise<Partial<Product>>
  addProduct: (productData: Partial<Product>) => Promise<void>
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
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

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const getProducts = async () => {
    try {
      const products = await fetch(`${API_URL}/products?${page ? `page=${page}` : ""}&${category ? `category=${category}` : ""}&${filter ? `filter=${filter}` :""}`, { method: 'GET' })
      const data = await products.json()
      setProducts(data)
      return data
    } catch (error) {
      console.info(error)
    }
  }
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, filter])

  const getProductById = async (id: string) => {
    try {
      const product = await fetch(`${API_URL}/products/${id}`, { method: 'GET' })
      const data = await product.json()
      return data;
    } catch (error) {
      console.info(error)
    }
  }

  const addProduct = async (productData: Partial<Product>) => {
    try {
      const { categories, name, price, images, rate, shortDescription, weights, benefits, InStock, availability, totalSales, reviews, } = productData
      const newProduct = {
        name, price, images, rate, shortDescription, weights, categories, benefits, InStock, availability, totalSales, reviews,
      }
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
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
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
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

      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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