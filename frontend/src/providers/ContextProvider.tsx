import { ReactNode, useEffect, useState } from "react";
import { CartItem, OrderItem } from "../client/types.gen";
import { AppContext } from "./interface/context";
import { getTotalPrice } from "../utils/helperFunctions";
import { BASE_API_URL } from "../utils/env.config";
import { toast } from "react-toastify";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<string>("")
  const [sizeIdx, setSizeIdx] = useState<number>(0)
  const [page, setPage] = useState<number>(1);
  const [paymentFormUrl, setPaymentFormUrl] = useState<string>("")
  const [filter, setFilter] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>(JSON.parse(sessionStorage.getItem("cartItems") as string) || [])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    // when the cart items change, recalculate the total price
    setTotalPrice(parseFloat(getTotalPrice(cartItems).toFixed(2)))
  }, [cartItems])

  // listen for payment notifications from the server
  useEffect(() => {
    const eventSource = new EventSource(`${BASE_API_URL}/events`)
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.event === 'payment_success') {
        sessionStorage.removeItem("orderId")
        sessionStorage.removeItem("cartItems")
        setCartItems([])
        setOrderItems([])
        setPaymentFormUrl("")
        window.location.href = "/thank-you"
        toast.success("Payment received successfully")
      }
    }
    return () => {
      eventSource.close()
    }
  }, [])
  const values = {
    setFilter,
    setPage,
    setCategory,
    orderItems,
    setOrderItems,
    page,
    filter,
    sizeIdx,
    setSizeIdx,
    category,
    cartItems,
    totalPrice,
    setTotalPrice,
    setCartItems,
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