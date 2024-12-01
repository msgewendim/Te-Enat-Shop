import RecipeDal from "../Dal/RecipeDal";
import { Recipe } from "../../types/recipe.types";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class RecipeService {
  private recipeDataAccess: RecipeDal;

  constructor(recipeDataAccess: RecipeDal) {
    this.recipeDataAccess = recipeDataAccess;
  }

  async getRecipe(recipeId: string): Promise<Recipe> {
    try {
      const result = await this.recipeDataAccess.getRecipe(recipeId);
      if (!result) {
        throw new NotFoundError(`Recipe with id: ${recipeId} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addRecipe(recipe: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.addRecipe(recipe);
    } catch (error) {
      throw new BadRequestError("Can not add Recipe!");
    }
  }

  async getAllRecipes(
    page: number,
    limit?: number,
    searchTerm?: string,
    category?: string
  ): Promise<Recipe[] | unknown> {
    try {
      if (!page) page = 1;
      if (!limit) limit = 9;
      return (await this.recipeDataAccess.getAllRecipes(
        page,
        limit,
        searchTerm,
        category
      )) as Recipe[];
    } catch (error) {
      throw new NotFoundError("No Recipes Found!");
    }
  }

  async updateRecipe(recipeId: string, recipeData: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.updateRecipe(recipeId, recipeData);
    } catch (error) {
      throw new BadRequestError(
        `Can not update Recipe! ${(error as Error).message}`
      );
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await this.recipeDataAccess.deleteRecipe(recipeId);
    } catch (error) {
      throw new BadRequestError(
        `Can't delete Recipe ${(error as Error).message}`
      );
    }
  }

  async getRandomRecipes(
    page: number,
    limit: number
  ): Promise<Recipe[] | unknown> {
    try {
      const result = await this.recipeDataAccess.getRandomRecipes(page, limit);
      return result;
    } catch (error) {
      throw new NotFoundError(
        `Error getting random Recipes: ${(error as Error).message}`
      );
    }
  }
}
