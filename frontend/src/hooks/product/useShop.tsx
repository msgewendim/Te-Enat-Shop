import { useMemo } from "react"
import { query } from "../../providers/interface/context"
import { toast } from "react-toastify";
import { useAppContext } from "../app/useAppContext"
import useGenericData from "../app/useGenericData";
import { Product } from "../../client";

function useShop({ limit = 12 }: { limit?: number}) {
  const { page, setPage, cartItems, filter, openCart, setOpenCart, subCategory, category } = useAppContext()
  const query: query = useMemo<query>(() => {
    return {
      page,
      category,
      filter,
      limit,
      subCategory,
    }
  }, [page, filter, category, limit, subCategory])

  const { useGetItems } = useGenericData<Product>("/products");
  const { data: products, error, isLoading, isError, isPlaceholderData, refetch: refetchProducts } = useGetItems(query)

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
    products,
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