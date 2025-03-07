import mongoose from "mongoose";
import { Response, Request, NextFunction } from "express";
import { RecipeService } from "../Service/RecipeService";
import { validateAddRecipe, validateUpdateRecipe } from "../validators/recipes";
import { BadRequestError, ValidationError } from "../utils/customErrors";
import { validateObjectId } from "../validators";

export class RecipeController {
  private recipeService: RecipeService;

  constructor(RecipeService: RecipeService) {
    this.recipeService = RecipeService;
  }

  async getRecipe(req: Request, res: Response, next: NextFunction) {
    const recipeId = req.params._id;
    if (!validateObjectId(recipeId)) {
      return next(new BadRequestError("Invalid recipe ID format"));
    }
    try {
      const recipeData = await this.recipeService.getRecipe(recipeId);
      if (!recipeData) {
        return res.status(400).json({
          success: true,
          message: "Recipe not found",
          data: null,
        });
      }
      res.status(200).json({
        success: true,
        message: "Recipe fetched successfully",
        data: recipeData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, filter, category, limit, exclude } = req.query;
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);

      if (exclude && !validateObjectId(exclude as string)) {
        return next(new BadRequestError("Invalid recipe ID format"));
      }
      const excludeById = mongoose.Types.ObjectId.isValid(exclude as string)
        ? (exclude as string)
        : undefined;

      const recipes = await this.recipeService.getAllRecipes(
        parsedPage,
        parsedLimit,
        filter as string,
        category as string,
        excludeById
      );
      if (recipes.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No recipes found",
          data: [],
        });
      }
      res.status(200).json({
        success: true,
        message: "Recipes fetched successfully",
        data: recipes,
      });
    } catch (error) {
      next(error);
    }
  }

  async addRecipe(req: Request, res: Response, next: NextFunction) {
    const recipe = req.body;
    const { error } = validateAddRecipe(recipe);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      await this.recipeService.addRecipe(recipe);
      res.status(201).json({
        success: true,
        message: "Recipe Added to DB!",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRecipe(req: Request, res: Response, next: NextFunction) {
    const recipeId = req.params._id;
    if (!validateObjectId(recipeId)) {
      return next(new BadRequestError("Invalid recipe ID format"));
    }
    try {
      await this.recipeService.deleteRecipe(recipeId);
      res.status(200).json({
        success: true,
        message: "Recipe Deleted from DB!",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRecipe(req: Request, res: Response, next: NextFunction) {
    const recipeId = req.params._id;
    const recipeData = req.body;
    if (!validateObjectId(recipeId)) {
      return next(new BadRequestError("Invalid recipe ID format"));
    }
    const { error } = validateUpdateRecipe(recipeData);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      await this.recipeService.updateRecipe(recipeId, recipeData);
      res.status(201).json({
        success: true,
        message: "Recipe Updated!",
      });
    } catch (error) {
      next(error);
    }
  }
  async getRandomRecipes(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 3 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    try {
      const randomRecipes = await this.recipeService.getRandomRecipes(
        parsedPage,
        parsedLimit
      );
      if (randomRecipes.items.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No random recipes found",
          data: [],
        });
      }
      res.status(200).json({
        success: true,
        message: "Random recipes fetched successfully",
        data: randomRecipes,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRecipesByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;
    try {
      const recipes = await this.recipeService.getRecipesByName(name as string);
      if (recipes.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No recipes found",
          data: [],
        });
      }
      res.status(200).json({
        success: true,
        message: "Recipes fetched successfully",
        data: recipes,
      });
    } catch (error) {
      next(error);
    }
  }
}
