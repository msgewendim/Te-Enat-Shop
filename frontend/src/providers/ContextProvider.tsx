import { ReactNode, useEffect, useState } from "react";
import { client, deleteProductsById, getAllProducts, getProduct, postProducts, putProductsById } from '../client/services.gen';
import { CartItem, Product } from "../client/types.gen";
import { AppContext, query } from "./interface/context";
import { localClient } from "../utils/client.config";


const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const query: query = {
    page,
    category,
    filter,
    limit: 9,
  }
  const getProducts = async (query?: query) => {
    try {
      const { data, error } = await getAllProducts({
        client: localClient,
        query: query ? query : {}
      })
      if (error) {
        throw new Error(`Field to fetch products ${error}`);
      }
      setProducts(data as Product[])
      return data as Product[];
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
      const { data, error } = product
      if (error) throw new Error(`Error fetch product with ${id} : ${error}`)
      if (!data) throw new Error(`Product ${id} not found in database`)
      return data as Product;
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
      await getProducts(query)
    } catch (error) {
      console.info(error);
    }
  }
  const getTotalPrice = () => {
    return cartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0)
  }
  useEffect(() => {
    getProducts(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, category])

  useEffect(() => {
    setTotalPrice(getTotalPrice())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])


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
    page,
    filter,
    category,
    cartItems,
    totalPrice,
    setTotalPrice,
    setCartItems,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;