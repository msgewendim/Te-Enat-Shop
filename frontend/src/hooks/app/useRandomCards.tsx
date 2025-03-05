import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { RandomItem } from "../../client/types.gen";
import { randomizeArray } from "../../utils/helperFunctions";
import { useGetRandomItems } from "../useAppData";

function useRandomCards<T extends RandomItem>({ endpoint }: { endpoint: string }) {

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const limit = isMobile ? 1 : 3;
  const [page, setPage] = useState(1);

  const query = useCallback(() => ({ page, limit }), [page, limit]);

  const { data, isLoading, isError, error } = useGetRandomItems(endpoint, query())
  const { data: response } = data || {}
  const { items, totalPages } = response || {}

  // Media query listener to adjust items per page based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      setPage(1)
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const randomizedItems = randomizeArray<T>(items as T[] || []);

  if (isError && error) toast.error(error.message);

  const handlePrevious = () => setPage((old) => Math.max(old - 1, 1));
  const handleNext = () => setPage((old) => (totalPages && old < totalPages ? old + 1 : old));

  return {
    data: randomizedItems,
    isLoading,
    isError,
    error,
    setPage,
    page,
    totalPages,
    hasMore: page < (totalPages || 0),
    currentPage: page,
    handlePrevious,
    handleNext,
    limit,
  };
}

export default useRandomCards;