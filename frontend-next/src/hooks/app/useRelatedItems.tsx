import { useState } from "react";

import { useGetRelatedItems } from "../useAppData";

function useRelatedItems(endpoint: string, itemCategory: string, exclude: string) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const { data, isError, isLoading, error } = useGetRelatedItems(endpoint, exclude, {
    category: itemCategory,
    limit: itemsPerPage,
  });
  const items = Array.isArray(data) ? data : []
  const nextItems = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, (items?.length || 0) - itemsPerPage)
    );
  };

  const prevItems = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };
  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage)
  return {
    currentIndex,
    itemsPerPage,
    items,
    isError,
    isLoading,
    error,
    nextItems,
    prevItems,
    visibleItems,
    hasMore: currentIndex + itemsPerPage < (items?.length || 0),
  };
}

export default useRelatedItems