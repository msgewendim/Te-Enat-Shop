import { useState, useMemo } from "react"
import { query } from "../providers/interface/context"
import { toast } from "react-toastify";
import { useGetProducts } from "../hooks/useProductsData"
import { useAppContext } from "../hooks/useAppContext"
const useShop = () => {
  const [openCart, setOpenCart] = useState(false)
  const { page, setPage, cartItems, category, filter } = useAppContext()
  const query: query = useMemo<query>(() => {
    return {
      page,
      category,
      filter,
      limit: 12,
    }
  }, [page, filter, category])
  const { data, error, isLoading, isError, isPlaceholderData } = useGetProducts(query)

  if (isError) {
    toast.error(error.message)
  }

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (!isPlaceholderData) {
      setPage(page + 1)
    }
  };

  return {
    openCart,
    setOpenCart,
    data,
    error,
    isLoading,
    isError,
    isPlaceholderData,
    handlePrevious,
    handleNext,
    cartItems,
    page,
    setPage,
    category,
    filter,
    query,
  }
}

export default useShop