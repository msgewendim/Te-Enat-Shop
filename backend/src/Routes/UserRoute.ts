import express, { NextFunction, Request, Response } from "express";
import jwtCheck from "../utils/middleware/auth.config";
import {} from "express-oauth2-jwt-bearer";
import { UseController } from "../controllers/User.controller";
import { UserService } from "../Service/UserService";

const userController = new UseController(new UserService());

const router = express.Router();
router.post("/", jwtCheck, async (req: Request, res: Response) => {
  const user = await userController.updateUserWithAuth(req, res);
  res.json({ message: "user updated in db", user }).status(201);
});
router.post(
  "/form/newsletter",
  async (req: Request, res: Response, next: NextFunction) =>
    await userController.addToNewsletter(req, res, next)
);
router.post(
  "/form/early-adapter",
  async (req: Request, res: Response, next: NextFunction) =>
    await userController.addToEarlyAdapter(req, res, next)
);
router.post(
  "/form/tobia-waiting-list",
  async (req: Request, res: Response, next: NextFunction) =>
    await userController.addToTobiaWaitList(req, res, next)
);
router.post(
  "/form/design-product",
  async (req: Request, res: Response, next: NextFunction) =>
    await userController.addToDesignProduct(req, res, next)
);

export default router;
