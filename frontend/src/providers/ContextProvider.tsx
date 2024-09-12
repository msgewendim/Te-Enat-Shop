import { ReactNode, useEffect, useState } from "react";
import { client, deleteProductsById, getAllProducts, getProduct, postOrdersV1PaymentsForm, postProducts, putProductsById } from '../client/services.gen';
import { CartItem, ClientDetails, OrderItem, Product } from "../client/types.gen";
import { AppContext, query } from "./interface/context";
import { localClient } from "../utils/client.config";


const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [paymentFormUrl, setPaymentFormUrl] = useState<string>("")
  const [filter, setFilter] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const getProducts = async (query?: query) => {
    try {
      const { data, error } = await getAllProducts({
        client: localClient,
        query: query ? query : {}
      })
      if (error) {
        throw new Error(`Field to fetch products ${error}`);
      }
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
      await getProducts({
        page, limit: 9, filter, category
      })
    } catch (error) {
      console.info(error);
    }
  }
  const getPaymentForm = async (clientData: ClientDetails, totalPrice: number, orderItems: OrderItem[]) => {
    try {
      const body = {
        clientData: clientData,
        totalPrice,
        orderItems: orderItems,
      }
      const { data, error } = await postOrdersV1PaymentsForm({
        client: localClient,
        body: body,
      })
      if (error) {
        throw new Error(`Error fetching payment form: ${error}`)
      }
      if (data.success) {
        setPaymentFormUrl(data.url)
      } else {
        console.log("Couldn't get payment form", data.errorMessage)
      }
    } catch (error) {
      console.info(error);
    }
  }
  const getTotalPrice = () => {
    return cartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0)
  }
  useEffect(() => {
    getProducts().then((products) => setProducts(products as Array<Product>))
  }, [])
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    setTotalPrice(parseFloat(getTotalPrice().toFixed(2)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  const values = {
    setProducts,
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    setFilter,
    setPage,
    setCategory,
    products,
    orderItems,
    setOrderItems,
    getTotalPrice,
    page,
    filter,
    category,
    cartItems,
    totalPrice,
    setTotalPrice,
    setCartItems,
    getPaymentForm,
    paymentFormUrl,
    setPaymentFormUrl,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;