import express, { Request, Response, NextFunction } from "express";
import { OrderService } from "../Service/OrderService";
import { OrderController } from "../controllers/OrderController";

const router = express.Router();
const orderController = new OrderController(new OrderService());

router.post(
  "/v1/generate-sale",
  async (req: Request, res: Response, next: NextFunction) =>
    await orderController.generateSale(req, res, next)
);
router.post(
  "/notify",
  async (req: Request, res: Response, next: NextFunction) =>
    await orderController.successfulPayment(req, res, next)
);
router.get(
  "/payments/status",
  async (req: Request, res: Response, next: NextFunction) =>
    await orderController.checkPaymentStatus(req, res, next)
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await orderController.getOrders(req, res, next);
});

export default router;
