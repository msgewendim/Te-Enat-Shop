import { useMemo } from "react";
import { query } from "../../providers/interface/context";
import { toast } from "react-toastify";
import { useAppContext } from "../app/useAppContext";
import useGenericData from "../app/useGenericData";
import { Recipe } from "../../client";
import { useEffect } from "react";

function useRecipes({ limit = 12 }: { limit?: number }) {
  const { page, setPage, category, filter, setCategory } = useAppContext();
  const query: query = useMemo<query>(() => {
    return {
      page,
      category,
      filter,
      limit,
    };
  }, [page, filter, category, limit]);
  const { useGetItems } = useGenericData<Recipe>("/recipes");
  const {
    data: recipes,
    error,
    isLoading,
    isError,
    isPlaceholderData,
    refetch: refetchRecipes,
  } = useGetItems(query);

  if (isError) {
    toast.error(error.message);
  }

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (!isPlaceholderData) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setCategory("");
  }, [setCategory]);
  return {
    recipes,
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
    refetchRecipes,
  };
}

export default useRecipes;
