import { ReactNode, useEffect, useState } from "react";

import { Product, Recipe, Package } from "../../client/types.gen";
import { AppContext, ModalState } from "../interface/context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // checkout
  const [paymentFormUrl, setPaymentFormUrl] = useState<string>("")
  // pagination
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("")
  // cart
  const [openCart, setOpenCart] = useState(false)

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
  const [currentEndpoint, setCurrentEndpoint] = useState<string>(window.location.pathname)


  // listen for payment notifications from the server
  // useEffect(() => {
  //   const eventSource = new EventSource(`${BASE_API_URL}/events`)
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     if (data.event === 'payment_success') {
  //       window.location.href = "/thank-you"
  //       toast.success("Payment received successfully")
  //     }
  //   }
  //   return () => {
  //     eventSource.close()
  //   }
  // }, [])

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

  useEffect(() => {
    // when route of app changes, change the category to ""
    const currentPath = window.location.pathname
    if (currentPath !== currentEndpoint) {
      setCurrentEndpoint(currentPath)
      setCategory("")
    }
    return () => {
      setCurrentEndpoint(window.location.pathname)
    }
  }, [currentEndpoint, setCurrentEndpoint, setCategory])

  // useEffect(() => {
  //   if (paymentFormUrl) {
  //     window.location.href = paymentFormUrl
  //   }
  // }, [paymentFormUrl])

  // const clearCart = () => {
  //   sessionStorage.removeItem("orderId")
  //   sessionStorage.removeItem("cartItems")
  //   setCartItems([])
  //   setPaymentFormUrl("")
  // }
  const values = {
    setFilter,
    setPage,
    setCategory,
    page,
    filter,
    category,
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