"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CartItem, Product, Recipe, Package } from "../../client/types.gen";
import { BASE_API_URL } from "../../utils/env.config";
import { getTotalPrice } from "../../utils/helperFunctions";
import { IContext, ModalState } from "../interface/context";
import { usePathname } from "next/navigation";

export const AppContext = createContext<IContext>({
  category: "",
  page: 0,
  filter: "",
  sizeIdx: 0,
  setSizeIdx: () => {},
  cartItems: [],
  totalPrice: 0,
  paymentFormUrl: "",
  adminActiveSection: "",
  setPaymentFormUrl: () => {},
  setCartItems: () => {},
  setFilter: () => {},
  setPage: () => {},
  setCategory: () => {},
  setTotalPrice: () => {},
  setAdminActiveSection: () => {},
  hideModal: () => {},
  showModal: () => {},
  clearCart: () => {},
  modalState: { isOpen: false, onConfirm: () => {} },
  setModalState: () => {},
  productToEdit: undefined,
  recipeToEdit: undefined,
  setProductToEdit: () => {},
  setRecipeToEdit: () => {},
  openCart: false,
  setOpenCart: () => {},
  packageToEdit: undefined,
  setPackageToEdit: () => {},
  subCategory: "",
  setSubCategory: () => {},
})

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
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  // const [orderItems, setOrderItems] = useState<OrderItem[]>([])
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
  
  const pathname = usePathname();
  const [currentEndpoint, setCurrentEndpoint] = useState<string>("")
  
  // Load cart items from localStorage on client side
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cart items from localStorage:", error);
      }
    }
    
    if (typeof window !== 'undefined') {
      setCurrentEndpoint(window.location.pathname);
    }
  }, []);
  
  useEffect(() => {
    // when the cart items change, recalculate the total price
    setTotalPrice(parseFloat(getTotalPrice(cartItems).toFixed(2)))
    
    // Save cart items to localStorage
    if (typeof window !== 'undefined' && cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems])

  // listen for payment notifications from the server
  useEffect(() => {
    let eventSource: EventSource | null = null;
    
    if (typeof window !== 'undefined') {
      eventSource = new EventSource(`${BASE_API_URL}/events`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'payment_success') {
          window.location.href = "/thank-you";
          toast.success("Payment received successfully");
        }
      };
    }
    
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const showModal = (onConfirm: () => void) => {
    setModalState(prevState => {
      console.log('Updating modal state', { ...prevState, isOpen: true, onConfirm });
      return { ...prevState, isOpen: true, onConfirm };
    });
  };
  
  useEffect(() => {
    if (!adminActiveSection.includes("edit")) {
      setProductToEdit(undefined);
      setRecipeToEdit(undefined);
      setPackageToEdit(undefined);
    }
  }, [adminActiveSection]);
  
  const hideModal = () => {
    setModalState({ isOpen: false, onConfirm: () => { } });
  };

  useEffect(() => {
    // when route of app changes, change the category to ""
    if (pathname !== currentEndpoint && typeof window !== 'undefined') {
      setCurrentEndpoint(pathname);
      setCategory("");
    }
  }, [pathname, currentEndpoint, setCategory]);

  const clearCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("orderId");
      localStorage.removeItem("cartItems");
    }
    setCartItems([]);
    setPaymentFormUrl("");
  };
  
  const values = {
    setFilter,
    setPage,
    setCategory,
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
    clearCart,
  };
  
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export function useAppContext(): IContext {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}