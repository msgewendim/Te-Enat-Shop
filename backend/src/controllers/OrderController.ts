import { OrderService } from "../Service/OrderService";
import { Request, Response } from "express";
export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async getPaymentForm(request: Request, response: Response) {
    const { clientData, totalPrice, orderItems } = request.body;
    console.log(orderItems[0], "OrderItems length");
    try {
      const data = await this.orderService.getPaymentForm(
        clientData,
        orderItems,
        totalPrice
      );
      console.log("PaymentForm data response:", data);
      if (data.success) {
        response.json(data).status(200);
      } else {
        const errorResponse = {
          message: "Payment gateway error",
          error: data.errorMessage + " with error code: " + data.errorCode,
        };
        response.json(errorResponse).status(400);
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

  async successful_payment(request: Request, response: Response){
    // Successful payment handling code goes here
    console.log(request, "response from morning service");
    // response.json({ message: "Payment successful" }).status(200);
  }
}
