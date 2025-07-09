import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { RandomItem } from "../../client/types.gen";
import { getRandomItems } from "../../lib/GenericService";
import { randomizeArray } from "../../utils/helperFunctions";

function useRandomCards<T extends RandomItem>({ endpoint }: { endpoint: string }) {

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const limit = isMobile ? 1 : 3;
  const [page, setPage] = useState(1);

  const query = useCallback(() => ({ page, limit }), [page, limit]);

  // Enhanced caching for random items - 15 minutes fresh, 1 hour cached
  const queryKey = [endpoint.replace(/^\//, ''), 'random', query()];
  const { data, isLoading, isError, error } = useQuery<{ items: T[], currentPage: number, totalPages: number }, Error>({
    queryKey,
    queryFn: () => getRandomItems<T>(endpoint, query()),
    
    // Random data stays fresh for 15 minutes (user requested 10-15 mins)
    staleTime: 15 * 60 * 1000, // 15 minutes
    
    // Keep in cache for 1 hour before garbage collection
    gcTime: 60 * 60 * 1000, // 1 hour
    
    // Don't refetch random data on window focus - it should stay consistent
    refetchOnWindowFocus: false,
    
    // Don't refetch on reconnect unless stale
    refetchOnReconnect: false,
    
    // Random data doesn't need frequent retries
    retry: 1,
  });
  
  // Standardized format: { items: T[], currentPage: number, totalPages: number }
  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

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

  const randomizedItems = randomizeArray<T>(items || []);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

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