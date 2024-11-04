import { IRecipe } from "../utils/interfaces/IRecipe";
import { Recipe } from "../../types/recipe.types";
import recipeModel from "../models/RecipeSchema";
import { QueryOptions } from "mongoose";

export class RecipeDal implements IRecipe<Recipe> {
  async getRecipe(id: string): Promise<Recipe | null> {
    try {
      const recipe = (await recipeModel.findById(id)) as Recipe;
      return recipe;
    } catch (error) {
      throw error;
    }
  }
  async getAllRecipes(
    page: number,
    limit: number,
    searchTerm?: string,
    category?: string
  ): Promise<Recipe[] | unknown[]> {
    try {
      const query: QueryOptions = {};
      // Search both `name` and `shortDescription` with the same input
      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: "i" } },
          { shortDescription: { $regex: searchTerm, $options: "i" } },
        ];
      }
      // Add category filter if provided
      if (category) {
        query.categories = { $regex: category };
      }
      const recipes = await recipeModel
        .find(query)
        .skip((page - 1) * limit) // Skip items based on the page number
        .limit(limit) // Limit the number of items returned
        .exec();
      return recipes;
    } catch (error) {
      throw error;
    }
  }
  async getRandomRecipes(page: number, limit: number) {
    try {
      const totalRecipes = await recipeModel.countDocuments();
      const totalPages = Math.ceil(totalRecipes / limit);

      const skip = (page - 1) * limit;
      const recipes = await recipeModel.aggregate([
        { $sample: { size: limit } },
        { $skip: skip },
      ]);
      return {
        recipes,
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteRecipe(id: string): Promise<void> {
    try {
      await recipeModel.deleteOne({
        _id: id,
      });
    } catch (error) {
      throw error;
    }
  }
  async updateRecipe(id: string, postData: Partial<Recipe>): Promise<Recipe> {
    try {
      const updatedRecipe = (await recipeModel.findByIdAndUpdate(
        id,
        postData
      )) as Recipe;
      return updatedRecipe;
    } catch (error) {
      throw error;
    }
  }
  async addRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const newRecipe = (await recipeModel.insertMany(recipe)) as Recipe[];
      console.log("Recipe created successfully", newRecipe);
      return newRecipe[0];
    } catch (error) {
      throw error;
    }
  }
}

export default RecipeDal;
