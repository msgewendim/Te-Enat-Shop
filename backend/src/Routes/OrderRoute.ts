import express, { Request, Response } from "express";
import OrderDal from "../Dal/OrderDal";
import { OrderService } from "../Service/OrderService";
import { OrderController } from "../controllers/OrderController";

const router = express.Router();
const orderController = new OrderController(new OrderService(new OrderDal()));

// get payment form
router.post("/v1/payments/form", async (req: Request, res: Response) => {
  await orderController.getPaymentForm(req, res);
});
export default router;
