import express, { Request, Response } from "express";
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
router.post("/addToCart", jwtCheck, async (req: Request, res: Response) => {
  const user = await userController.addToCart(req, res);
  res.json({ message: "user updated in db", user }).status(201);
});

export default router;
