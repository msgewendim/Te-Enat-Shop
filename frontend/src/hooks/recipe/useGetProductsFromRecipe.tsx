import { Ingredient, Product } from "../../client/types.gen";
import { existingProductsFromRecipe } from "../../utils/helperFunctions";
import { useGetItemsByNames } from "../useAppData";

function useGetProductsFromRecipe(ingredients: Ingredient[]) {
  const names = existingProductsFromRecipe(ingredients);
  const { data: productsFromRecipe, isError, error, isLoading } = useGetItemsByNames(names);
  return {
    productsFromRecipe: productsFromRecipe?.data as Product[],
    isError,
    error,
    isLoading
  };
}

export { useGetProductsFromRecipe };