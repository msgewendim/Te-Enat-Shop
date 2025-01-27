import { RecipeService } from "../Service/RecipeService";
import express, { Request, Response, NextFunction } from "express";
import RecipeDal from "../Dal/RecipeDal";
import { RecipeController } from "../controllers/RecipeController";
import jwtCheck from "../utils/middleware/auth.config";

const router = express.Router();
const recipeController = new RecipeController(
  new RecipeService(new RecipeDal())
);

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.getAllRecipes(req, res, next)
);
router.get(
  "/random",
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.getRandomRecipes(req, res, next)
);
router.get(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.getRecipe(req, res, next)
);
router.post(
  "/",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.addRecipe(req, res, next)
);
router.delete(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.deleteRecipe(req, res, next)
);
router.put(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await recipeController.updateRecipe(req, res, next)
);

export default router;
