import { IRecipe } from "../utils/interfaces/IRecipe";
import { Recipe } from "../../types/recipe.types";
import recipeModel from "../models/RecipeSchema";
import { QueryOptions } from "mongoose";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class RecipeDal implements IRecipe<Recipe> {
  async getRecipe(id: string): Promise<Recipe> {
    try {
      const recipe = (await recipeModel.findById(id)) as Recipe;
      if (!recipe) {
        throw new NotFoundError(`Recipe with id: ${id} not found`);
      }
      return recipe;
    } catch (error) {
      throw error;
    }
  }
  async getAllRecipes(
    page: number,
    limit: number,
    searchTerm?: string,
    category?: string,
    excludeById?: string
  ): Promise<Recipe[]> {
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
        query.categories = {
          $elemMatch: {
            nameInEnglish: { $regex: category },
          },
        };
        if (excludeById) {
          query._id = { $ne: excludeById };
        }
      }
      console.log(query, "query");
      const recipes = await recipeModel
        .find(query)
        .skip((page - 1) * limit) // Skip items based on the page number
        .limit(limit) // Limit the number of items returned
        .exec();

      return recipes as Recipe[];
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
      if (!recipes) {
        throw new NotFoundError("No random recipes found");
      }
      return {
        items: recipes,
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteRecipe(id: string): Promise<void> {
    try {
      const result = await recipeModel.deleteOne({
        _id: id,
      });
      if (!result.deletedCount) {
        throw new NotFoundError(`Recipe with id: ${id} not found`);
      }
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
      if (!updatedRecipe) {
        throw new NotFoundError(`Recipe with id: ${id} not found`);
      }
      console.log("recipe updated successfully dal", updatedRecipe);
      return updatedRecipe;
    } catch (error) {
      throw error;
    }
  }
  async addRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const newRecipe = await recipeModel.insertMany(recipe);
      if (!newRecipe) {
        throw new BadRequestError("Failed to add recipe");
      }
      return newRecipe[0] as Recipe;
    } catch (error) {
      throw error;
    }
  }
}

export default RecipeDal;
