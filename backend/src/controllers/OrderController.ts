import { OrderTransaction, PaymentFormRequest } from "../../types/order.types";
import { OrderService } from "../Service/OrderService";
import { NextFunction, Request, Response } from "express";
import { sendPaymentNotification } from "../utils/middleware/sse.events";
import {
  BadRequestError,} from "../utils/customErrors";
import { validateObjectId } from "../validators";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }
  async getOrders(request: Request, response: Response, next: NextFunction) {
    try {
      const { limit, page } = request.query;
      const orders = await this.orderService.getOrders(
        Math.max(1, Number(limit)),
        Math.max(1, Number(page))
      );
      response.json({
        data: orders, 
        success: true,
        message: "Orders fetched successfully",
      }).status(200);
    } catch (error: any) {
      next(error);
    }
  }

  async generateSale (request: Request, response: Response, next: NextFunction) {
    try {
      const { orderItems } = request.body
      const saleUrl = await this.orderService.generateSale(orderItems);
      response.json({
        success: true,
        message: "Sale generated successfully",
        data: {
          url : saleUrl
        } 
      }).status(200);
    } catch (error: any) {
      next(error);
    }
  }


  async checkPaymentStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { orderId } = request.params;
    if (!validateObjectId(orderId)) {
      return next(new BadRequestError("Invalid order ID format"));
    }
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
      next(error);
    }
  }

  async successfulPayment(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Successful payment
    try {
      console.log("request body in successfulPayment", request.body);
      // const transactionInfo = request.body as OrderTransaction;
      // await this.orderService.updatePaymentStatus(transactionInfo);
      // sendPaymentNotification(transactionInfo.external_data);
      // response.sendStatus(200); // send to Morning server
      response.json({
        status: true,
        message: "Payment successful",
        data: request.body
      });
    } catch (error: any) {
      next(error);
    }
  }
}
