import { Response, Request } from "express";
import { RecipeService } from "../Service/RecipeService";

export class RecipeController {
  private recipeService: RecipeService;

  constructor(RecipeService: RecipeService) {
    this.recipeService = RecipeService;
  }

  async getRecipe(req: Request, res: Response) {
    const recipeId = req.params._id;
    try {
      const recipe = await this.recipeService.getRecipe(recipeId);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async getAllRecipes(req: Request, res: Response) {
    try {
      const { page, filter, category, limit } = req.query;
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);
      const recipes = await this.recipeService.getAllRecipes(
        parsedPage,
        parsedLimit,
        filter as string,
        category as string
      );
      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async addRecipe(req: Request, res: Response) {
    const recipe = req.body;
    console.log(recipe, "recipe data ");
    try {
      await this.recipeService.addRecipe(recipe);
      res.status(201).json({ message: "Recipe Added to DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async deleteRecipe(req: Request, res: Response) {
    const recipeId = req.params._id;
    console.log("Recipe Id to delete: " + recipeId);
    try {
      await this.recipeService.deleteRecipe(recipeId);
      res.status(200).json({ message: "Recipe Deleted from DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async updateRecipe(req: Request, res: Response) {
    const recipeId = req.params._id;
    const recipeData = req.body;
    try {
      await this.recipeService.updateRecipe(recipeId, recipeData);
      res.status(201).json({ message: "Recipe Updated!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
  async getTopRecipes(req: Request, res: Response) {
    const { page = 1, limit = 3 } = req.query;
    console.log(page, "getTopRecipes called, limit: " + limit, "page: " + page);
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    try {
      const result = await this.recipeService.getTopRecipes(
        parsedPage,
        parsedLimit
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
