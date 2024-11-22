import { Recipe } from "../../client/types.gen";
import { query } from "./../interface/context";
import { getRelatedItems, RandomItemsResponse } from "./Products";
import { axiosInstance } from ".";

const getRandomRecipes = async <T>(
  q: query
): Promise<RandomItemsResponse<T>> => {
  return (
    await axiosInstance.get("/recipes/top-recipes", {
      params: q,
    })
  ).data;
};
const getRecipes = async (q: query): Promise<Recipe[]> => {
  // Fetch data from your API endpoint with the provided query
  return (await axiosInstance.get("/recipes", { params: q })).data;
};

const getRecipeById = async (id: string): Promise<Recipe> => {
  // Fetch data from your API endpoint with the provided ID
  return (await axiosInstance.get(`/recipes/${id}`)).data;
};

const addRecipe = async (productData: Partial<Recipe>): Promise<Recipe> => {
  // Create a new product in your API endpoint with the provided data
  return (await axiosInstance.post("/recipes", productData)).data;
};

const updateRecipe = async (
  id: string,
  productData: Partial<Recipe>
): Promise<Recipe> => {
  // Update the product with the provided ID in your API endpoint with the provided data
  return (await axiosInstance.put(`/recipes/${id}`, productData)).data;
};

const deleteRecipe = async (id: string): Promise<void> => {
  // Delete the product with the provided ID from your API endpoint
  await axiosInstance.delete(`/recipes/${id}`);
};

export {
  getRelatedItems,
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRandomRecipes,
};
