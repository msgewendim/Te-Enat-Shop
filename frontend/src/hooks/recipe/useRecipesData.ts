import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  getRandomRecipes,
  updateRecipe,
} from "../../providers/api/Recipes";
import { query } from "../../providers/interface/context";
import { Recipe } from "../../client";
import { UpdateHookProps } from "../../providers/interface/general.props";

function useGetRecipes(query: query) {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => getRecipes(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

function useGetRandomRecipes(query: query) {
  return useQuery({
    queryKey: ["topRecipes", query],
    queryFn: () => getRandomRecipes(query),
    placeholderData: (previousData) => previousData,
  });
}

function useGetRecipeById(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
  });
}

function useAddRecipeMutation() {
  return useMutation({
    mutationFn: (recipeData: Partial<Recipe>) => addRecipe(recipeData),
    onSuccess: (data) => {
      console.log("Recipe added successfully", data);
    },
    onError: (error) => {
      console.error("Failed to add recipes", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useDeleteRecipeMutation() {
  return useMutation({
    mutationFn: (recipeId: string) => deleteRecipe(recipeId),
    onSuccess: (data) => {
      console.log("Recipe deleted successfully", data);
    },
    onError: (error) => {
      console.error("Failed to delete recipes", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useUpdateRecipeMutation() {
  return useMutation({
    mutationFn: (data: UpdateHookProps<Recipe>) =>
      updateRecipe(data.itemId, data.itemData),
    onSuccess: (data) => {
      console.log("Recipe updated successfully", data);
    },
    onError: (error) => {
      console.error("Failed to update recipes", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

export {
  useGetRecipes,
  useGetRecipeById,
  useAddRecipeMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useGetRandomRecipes,
};
