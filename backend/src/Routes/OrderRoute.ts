import express, { Request, Response } from "express";
import { OrderService } from "../Service/OrderService";
import { OrderController } from "../controllers/OrderController";

const router = express.Router();
const orderController = new OrderController(new OrderService());

router.post(
  "/v1/payments/form",
  async (req: Request, res: Response) =>
    await orderController.getPaymentForm(req, res)
);
router.post(
  "/notify",
  async (req: Request, res: Response) =>
    await orderController.successfulPayment(req, res)
);
router.get(
  "/payments/status",
  async (req: Request, res: Response) =>
    await orderController.checkPaymentStatus(req, res)
);

export default router;
