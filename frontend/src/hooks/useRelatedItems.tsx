import { toast } from "react-toastify";
import { useState } from "react";
import { useGetRelatedItems } from "./useProductsData";
import Loader from "../components/ui/Loader";

const useRelatedItems = (itemCategory: string, type: string) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4
  const { data: items, isError, isLoading, error } = useGetRelatedItems({
    category: itemCategory,
    type: type,
    limit: itemsPerPage
  });
  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error.message);
    return null;
  }
  if (!items || items.length === 0) {
    return null;
  }

  const titleKey = type === 'products' ? 'relatedProducts.title' : 'relatedRecipes.title';
  const linkPrefix = type === 'products' ? '/products' : '/recipes';
  const nextItems = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, items.length - itemsPerPage)
    );
  };

  const prevItems = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return {
    prevItems,
    nextItems,
    visibleItems,
    titleKey,
    linkPrefix,
    hasMore: currentIndex + itemsPerPage < items.length,
    totalPages: Math.ceil(items.length / itemsPerPage),
    items,
    currentPage: Math.floor(currentIndex / itemsPerPage) + 1,
    isError,
    isLoading,
    error,
    totalItems: items.length,
  }
}

export default useRelatedItems