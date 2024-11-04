import { useMemo } from "react"
import { query } from "../providers/interface/context"
import { toast } from "react-toastify";
import { useGetProducts } from "../hooks/useProductsData"
import { useAppContext } from "../hooks/useAppContext"

function useShop({ limit = 12 }: { limit?: number }) {
  const { page, setPage, cartItems, category, filter, openCart, setOpenCart } = useAppContext()
  const query: query = useMemo<query>(() => {
    return {
      page,
      category,
      filter,
      limit,
    }
  }, [page, filter, category, limit])
  const { data, error, isLoading, isError, isPlaceholderData, refetch: refetchProducts } = useGetProducts(query)

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
    products: data,
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
    refetchProducts,
  }
}

export default useShop