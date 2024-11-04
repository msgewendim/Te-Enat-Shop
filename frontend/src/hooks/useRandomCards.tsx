import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { randomizeArray } from "../utils/helperFunctions";
import { query } from "../providers/interface/context";

interface QueryResponse<T> {
  products?: T[];
  packages?: T[];
  recipes?: T[];
  totalPages?: number;
  currentPage?: number;
  hasMore?: boolean;
}

interface HookResponse<T> {
  data?: QueryResponse<T>;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
}
function useRandomCards<T>(
  {
    fetchHook,
    dataKey = 'products'
  }: {
    fetchHook: (query: query) => HookResponse<T>;
    dataKey?: string;
  }) {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const limit = isMobile ? 1 : 3;
  const { data, isError, isLoading, error } = fetchHook({
    page,
    limit
  });

  const randomizedItems = randomizeArray<T>(data?.[dataKey as keyof QueryResponse<T>] as T[] || []);

  if (isError) toast.error(error?.message);

  return {
    data: randomizedItems,
    isLoading,
    totalPages: data?.totalPages,
    currentPage: page,
    hasMore: page < (data?.totalPages || 0),
    isError,
    error,
    page,
    setPage
  }
}

export default useRandomCards;