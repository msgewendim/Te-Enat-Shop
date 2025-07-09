import { useState, useMemo, useEffect } from "react"
import { toast } from "react-toastify";

import { Package } from "../../client/types.gen";
import { query } from "../../providers/interface/context"
import useGenericData from "../app/useGenericData";

function usePackages({ limit = 9 }: { limit?: number }) {
  const [openCart, setOpenCart] = useState(false)
  const [page, setPage] = useState(1)
  const query: query = useMemo<query>(() => {
    return {
      page,
      limit,
    }
  }, [page, limit])
  const { useGetItems } = useGenericData<Package>("/packages");
  const { data, error, isLoading, isError, isPlaceholderData } = useGetItems(query)

  // Debug logging temporarily removed

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'An error occurred while fetching packages')
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
    page,
    setPage,
    query,
  }
}

export default usePackages