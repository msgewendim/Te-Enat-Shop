import { ReactNode, useEffect, useState } from "react";
import { CartItem, OrderItem, Product, Recipe, Package } from "../../client/types.gen";
import { AppContext, ModalState } from "../interface/context";
import { getTotalPrice } from "../../utils/helperFunctions";
import { BASE_API_URL } from "../../utils/env.config";
import { toast } from "react-toastify";

const AppProvider = ({ children }: { children: ReactNode }) => {

  // checkout
  const [paymentFormUrl, setPaymentFormUrl] = useState<string>("")
  // pagination
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("")
  // cart
  const [openCart, setOpenCart] = useState(false)
  const [sizeIdx, setSizeIdx] = useState<number>(0)
  const [cartItems, setCartItems] = useState<CartItem[]>(JSON.parse(sessionStorage.getItem("cartItems") as string) || [])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  // admin
  const [adminActiveSection, setAdminActiveSection] = useState<string>("products")
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe>();
  const [packageToEdit, setPackageToEdit] = useState<Package>();
  // delete product modal
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    onConfirm: () => { },
  });

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

  const showModal = (onConfirm: () => void) => {
    setModalState(prevState => {
      console.log('Updating modal state', { ...prevState, isOpen: true, onConfirm });
      return { ...prevState, isOpen: true, onConfirm };
    });
  };
  useEffect(() => {
    if (!adminActiveSection.includes("edit")) {
      setProductToEdit(undefined)
      setRecipeToEdit(undefined)
      setPackageToEdit(undefined)
    }
  }, [adminActiveSection])
  const hideModal = () => {
    setModalState({ isOpen: false, onConfirm: () => { } });
  };
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
    adminActiveSection,
    setAdminActiveSection,
    showModal,
    hideModal,
    modalState,
    setModalState,
    setProductToEdit,
    productToEdit,
    setRecipeToEdit,
    recipeToEdit,
    openCart,
    packageToEdit,
    setPackageToEdit,
    setOpenCart,
    subCategory,
    setSubCategory,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider;