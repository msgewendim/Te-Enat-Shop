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
      console.log("PaymentForm data response:", data);
      if (data.success) {
        response
          .json({
            ...data
          })
          .status(200);
      } else {
        response
          .json({
            message: "payment request failed with error: " + data.errorCode,
            error: data.errorMessage,
            url: null,
            success: false,
          })
          .status(400);
      }
    } catch (error: any) {
      response
        .json({
          message: "Error getting payment form",
          error: error.message,
          success: false,
        })
        .status(400);
    }
  }
}
