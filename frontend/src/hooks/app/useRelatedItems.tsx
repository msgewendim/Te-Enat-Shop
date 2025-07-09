import { useState } from "react";

import { RandomItem } from "../../client/types.gen";
import useGenericData from "./useGenericData";

function useRelatedItems(endpoint: string, itemCategory: string, exclude: string) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // Using standardized useGenericData for related items
  const { useGetRelatedItems } = useGenericData<RandomItem>(endpoint);
  const { data, isError, isLoading, error } = useGetRelatedItems(exclude, {
    category: itemCategory,
    limit: itemsPerPage,
  });
  
  // Standardized: data is already T[] directly
  const items = data || [];
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