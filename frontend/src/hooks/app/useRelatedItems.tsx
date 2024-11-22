import { useState } from "react";
import { useGetRelatedItems } from "../useAppData";

function useRelatedItems<T>(itemCategory: string, type: string) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const { data: items, isError, isLoading, error } = useGetRelatedItems<T>({
    category: itemCategory,
    type: type,
    limit: itemsPerPage
  });

  const nextItems = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, (items?.length || 0) - itemsPerPage)
    );
  };

  const prevItems = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return {
    currentIndex,
    itemsPerPage,
    items,
    isError,
    isLoading,
    error,
    nextItems,
    prevItems,
    visibleItems: items?.slice(currentIndex, currentIndex + itemsPerPage) || [],
    hasMore: currentIndex + itemsPerPage < (items?.length || 0),
  };
}

export default useRelatedItems