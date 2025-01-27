import RecipeDal from "../Dal/RecipeDal";
import { Recipe } from "../../types/recipe.types";
import { RandomItemsResponse } from "../../types";

export class RecipeService {
  private recipeDataAccess: RecipeDal;

  constructor(recipeDataAccess: RecipeDal) {
    this.recipeDataAccess = recipeDataAccess;
  }

  async getRecipe(recipeId: string): Promise<Recipe> {
    try {
      return (await this.recipeDataAccess.getRecipe(recipeId)) as Recipe;
    } catch (error) {
      throw error;
    }
  }

  async addRecipe(recipe: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.addRecipe(recipe);
    } catch (error) {
      throw error;
    }
  }

  async getAllRecipes(
    page: number,
    limit?: number,
    searchTerm?: string,
    category?: string,
    excludeById?: string
  ): Promise<Recipe[]> {
    try {
      if (!page) page = 1;
      if (!limit) limit = 9;
      return (await this.recipeDataAccess.getAllRecipes(
        page,
        limit,
        searchTerm,
        category,
        excludeById
      )) as Recipe[];
    } catch (error) {
      throw error;
    }
  }

  async updateRecipe(recipeId: string, recipeData: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.updateRecipe(recipeId, recipeData);
    } catch (error) {
      throw error;
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await this.recipeDataAccess.deleteRecipe(recipeId);
    } catch (error) {
      throw error;
    }
  }

  async getRandomRecipes(
    page: number,
    limit: number
  ): Promise<RandomItemsResponse> {
    try {
      return await this.recipeDataAccess.getRandomRecipes(page, limit);
    } catch (error) {
      throw error;
    }
  }
}
