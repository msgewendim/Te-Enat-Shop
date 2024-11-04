import axios from "axios";
import { BASE_API_URL } from "../utils/env.config";
import { Recipe } from "../client";
import { query } from "./interface/context";
import { RandomItemsResponse } from "./apiFunctionsProducts";

const axiosInstance = axios.create({ baseURL: BASE_API_URL });

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
const getRelatedItems = async (query: query): Promise<Recipe[] | Recipe[]> => {
  return (
    await axiosInstance.get(`/${query.type}`, {
      params: { query },
    })
  ).data;
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
