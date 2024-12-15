import { OrderTransaction, PaymentFormRequest } from "../../types/order.types";
import { OrderService } from "../Service/OrderService";
import { NextFunction, Request, Response } from "express";
import { sendPaymentNotification } from "../utils/middleware/sse.events";
// import { validatePaymentFormRequest } from "../validators/cart";
import {
  BadRequestError,
//   ServiceError,
//   ValidationError,
} from "../utils/customErrors";
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
  async getPaymentForm(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // const { error } = validatePaymentFormRequest(request.body.formData);
    // if (error) {
    //   return next(new ValidationError(error.message));
    // }
    // const { clientInfo, totalPrice, orderItems } = request.body
    //   .formData as PaymentFormRequest;
    try {
      // const data = await this.orderService.getPaymentForm(
      //   { ...clientInfo },
      //   orderItems,
      //   totalPrice
      // );
      // if (data.success) {
      //   response.json({
      //     data: data,
      //     success: true,
      //     message: "Payment form fetched successfully",
      //   }).status(200);
      // } else {
      //   const errorResponse = {
      //     success: false,
      //     message: "Payment gateway error",
      //     error: data.errorMessage + " with error code: " + data.errorCode,
      //   };
        // response.json(errorResponse).status(400);
      // }
      response.json({
        success: true,
        message: "This functionality is not yet implemented",
        data : {}
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
      const transactionInfo = request.body as OrderTransaction;
      await this.orderService.updatePaymentStatus(transactionInfo);
      sendPaymentNotification(transactionInfo.external_data);
      response.sendStatus(200); // send to Morning server
    } catch (error: any) {
      next(error);
    }
  }
}
