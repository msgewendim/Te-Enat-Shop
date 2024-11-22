import { OrderTransaction } from "../../types/order.types";
import { OrderService } from "../Service/OrderService";
import { Request, Response } from "express";
import { sendPaymentNotification } from "../utils/middleware/sse.events";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }
  async getOrders(request: Request, response: Response) {
    try {
      const { limit, page } = request.query;
      const orders = await this.orderService.getOrders(
        Number(limit),
        Number(page)
      );
      console.log(orders.length, "orders length");
      response.json(orders).status(200);
    } catch (error: any) {
      response.json({ message: error.message }).status(500);
    }
  }
  async getPaymentForm(request: Request, response: Response) {
    const { clientInfo, totalPrice, products } = request.body.formData;
    // console.log(request.body, "request emails");
    // console.log("--------------------------------------------------------");
    console.log(products.length, "OrderItems length");
    try {
      const data = await this.orderService.getPaymentForm(
        { emails: [clientInfo.email], ...clientInfo },
        products,
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
      console.log("Error when getting payment form", error.message, error.code);
      response
        .json({
          message: "Error getting payment form",
          error: error.message,
          success: false,
        })
        .status(400);
    }
  }
  async checkPaymentStatus(request: Request, response: Response) {
    const { orderId } = request.params;
    console.log(orderId);
    try {
      const paymentStatus = await this.orderService.checkPaymentStatus(orderId);
      if (paymentStatus === "succeeded") {
        response.json({
          status: true,
          message: "Payment succeeded",
        });
      } else if (paymentStatus === "pending") {
        response
          .json({ status: false, message: "Payment processing" })
          .status(200);
      }
    } catch (error: any) {
      response
        .json({
          message: "Error checking payment status",
          error: error.message,
        })
        .status(500);
    }
  }

  async successfulPayment(request: Request, response: Response) {
    // Successful payment
    try {
      const transactionInfo = request.body as OrderTransaction;
      await this.orderService.updatePaymentStatus(transactionInfo);
      sendPaymentNotification(transactionInfo.external_data);
      response.sendStatus(200); // send to Morning server
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
