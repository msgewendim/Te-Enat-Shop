import { OrderTransaction, PaymentFormRequest } from "../../types/order.types";
import { OrderService } from "../Service/OrderService";
import { NextFunction, Request, Response } from "express";
import { sendPaymentNotification } from "../utils/middleware/sse.events";
import {
  BadRequestError,} from "../utils/customErrors";
import { validateObjectId } from "../validators";
import { isSuccessfulTransaction, PayplusPaymentResponse } from "../utils/PaymentProvider/types";

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

  async getPaymentLink (request: Request, response: Response, next: NextFunction) {
    try {
      const { orderItems, customer, totalPrice } = request.body.formData;
      // Validate request body
      if (!orderItems?.length || !customer || !totalPrice) {
        return response.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      const paymentUrl = await this.orderService.getPaymentLink(
        orderItems,
        customer,
        totalPrice
      );

      return response.status(200).json({
        success: true,
        url: paymentUrl 
      });

    } catch (error) {
      console.error('Payment link generation error:', error);
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
      const transactionInfo = request.body as PayplusPaymentResponse;
      const transactionData = {
        transaction_type: transactionInfo.transaction.type,
        transaction : {
          transaction_uid: transactionInfo.transaction.uid,
          transaction_status: transactionInfo.transaction.status_code,
          transaction_amount: transactionInfo.transaction.amount,
          transaction_currency: transactionInfo.transaction.currency,
          transaction_date: transactionInfo.transaction.date,
        },
        payments : transactionInfo.transaction.payments,
        added_info: transactionInfo.transaction.more_info,
        customer_info : {
          customer_uid: transactionInfo.data.customer_uid,
          terminal_uid: transactionInfo.data.terminal_uid,
          card_holder_name: transactionInfo.data.card_information.card_holder_name,
        }
      }
      if (isSuccessfulTransaction(transactionInfo.transaction.status_code)) {
        await this.orderService.updatePaymentStatus(transactionData);
        sendPaymentNotification(transactionData.added_info as string);
      }    
      response.sendStatus(200); // send to Morning server
    } catch (error: any) {
      next(error);
    }
  }
}
