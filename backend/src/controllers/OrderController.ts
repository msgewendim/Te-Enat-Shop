import { OrderService } from "../Service/OrderService";
import { Request, Response } from "express";
export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async getPaymentForm(request: Request, response: Response) {
    const { clientData, totalPrice, orderItems } = request.body;
    try {
      const data = await this.orderService.getPaymentForm(
        clientData,
        orderItems,
        totalPrice
      );
      if (data.success) {
        response.json(data).status(200);
      } else {
        response.json(data).status(400);
      }
    } catch (error) {
      response.json("Error getting payment form").status(400);
    }
  }
}
