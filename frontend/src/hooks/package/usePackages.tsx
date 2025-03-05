import { useState, useMemo } from "react"
import { toast } from "react-toastify";

import { Package } from "../../client";
import { query } from "../../providers/interface/context"
import { useAppContext } from "../app/useAppContext"
import useGenericData from "../app/useGenericData";

function usePackages({ limit = 9 }: { limit?: number }) {
  const [openCart, setOpenCart] = useState(false)
  const [page, setPage] = useState(1)
  const { cartItems } = useAppContext()
  const query: query = useMemo<query>(() => {
    return {
      page,
      limit,
    }
  }, [page, limit])
  const { useGetItems } = useGenericData<Package>("/packages");
  const { data, error, isLoading, isError, isPlaceholderData } = useGetItems(query)

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
    packages: data || [],
    error,
    isLoading,
    isError,
    isPlaceholderData,
    handlePrevious,
    handleNext,
    cartItems,
    page,
    setPage,
    query,
  }
}

export default usePackages