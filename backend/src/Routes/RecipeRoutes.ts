import { RecipeService } from "../Service/RecipeService";
import express, { Request, Response } from "express";
import RecipeDal from "../Dal/RecipeDal";
import { RecipeController } from "../controllers/RecipeController";
import jwtCheck from "../utils/middleware/auth.config";

const router = express.Router();
const recipeController = new RecipeController(
  new RecipeService(new RecipeDal())
);

router.get(
  "/",
  async (req: Request, res: Response) =>
    await recipeController.getAllRecipes(req, res)
);
router.get(
  "/top-recipes",
  async (req: Request, res: Response) =>
    await recipeController.getTopRecipes(req, res)
);
router.get(
  "/:_id",
  async (req: Request, res: Response) =>
    await recipeController.getRecipe(req, res)
);
router.post(
  "/",

  async (req: Request, res: Response) =>
    await recipeController.addRecipe(req, res)
);
router.delete(
  "/:_id",
  async (req: Request, res: Response) =>
    await recipeController.deleteRecipe(req, res)
);
router.put(
  "/:_id",
  async (req: Request, res: Response) =>
    await recipeController.updateRecipe(req, res)
);

export default router;
