import express, { Request, Response, NextFunction } from "express";
import { OrderService } from "../Service/OrderService";
import { OrderController } from "../controllers/OrderController";

const router = express.Router();
const orderController = new OrderController(new OrderService());

router.post(
  "/generate-sale",
  async (req: Request, res: Response, next: NextFunction) =>
    await orderController.getPaymentLink(req, res, next)
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
router.get(
  "/:orderId/:transactionUid",
  async (req: Request, res: Response, next: NextFunction) =>
    await orderController.getOrder(req, res, next)
);
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await orderController.getOrders(req, res, next);
});

export default router;
