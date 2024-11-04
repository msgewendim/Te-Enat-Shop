import RecipeDal from "../Dal/RecipeDal";
import { Recipe } from "../../types/recipe.types";

export class RecipeService {
  private recipeDataAccess: RecipeDal;

  constructor(recipeDataAccess: RecipeDal) {
    this.recipeDataAccess = recipeDataAccess;
  }

  async getRecipe(recipeId: string): Promise<Recipe> {
    const result = await this.recipeDataAccess.getRecipe(recipeId);
    if (!result) {
      throw new Error(`Recipe with id : ${recipeId} Not found`);
    }
    return result;
  }

  async addRecipe(recipe: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.addRecipe(recipe);
    } catch (error) {
      console.log(error);
      throw new Error("Can not add Recipe!");
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
      throw new Error("NO Recipes Found!");
    }
  }

  async updateRecipe(recipeId: string, recipeData: Recipe): Promise<void> {
    try {
      await this.recipeDataAccess.updateRecipe(recipeId, recipeData);
    } catch (error) {
      throw new Error(`Can not update Recipe! ${(error as Error).message}`);
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await this.recipeDataAccess.deleteRecipe(recipeId);
    } catch (error) {
      throw new Error(`Can't delete Recipe ${(error as Error).message}`);
    }
  }
  async getTopRecipes(
    page: number,
    limit: number
  ): Promise<Recipe[] | unknown> {
    try {
      const result = await this.recipeDataAccess.getRandomRecipes(page, limit);
      console.log("recipesService: recipes.len ", result.recipes.length);
      return result;
    } catch (error) {
      throw new Error(
        `Error getting random Recipes: ${(error as Error).message}`
      );
    }
  }
}
