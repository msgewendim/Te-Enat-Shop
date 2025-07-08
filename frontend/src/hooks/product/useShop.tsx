import { useEffect, useMemo } from "react"
import { toast } from "react-toastify";
import { Product } from "../../client/types.gen";
import { query } from "../../providers/interface/context"
import { useAppContext } from "../app/useAppContext"
import useGenericData from "../app/useGenericData";

function useShop({ limit = 12 }: { limit?: number}) {
  const { page, setPage, filter, openCart, setOpenCart, subCategory, category, setCategory } = useAppContext()
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

  // Debug logging temporarily removed

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'An error occurred while fetching products')
    }
  }, [isError, error])

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (!isPlaceholderData) {
      setPage(page + 1)
    }
  };
  useEffect(() => {
    setCategory("")
  }, [setCategory])
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
    page,
    setPage,
    category,
    filter,
    query,
    refetchProducts,
  }
}

export default useShop