import mongoose from "mongoose";
import {
  Customer,
  Order,
  CartItem,
} from "../../types/order.types";
import {OrderModel} from "../models/OrderSchema";
import { BadRequestError, NotFoundError } from "../utils/customErrors";
import { SimplifiedTransaction } from "../utils/PaymentProvider/types";

const addOrder = async (
  customer: Customer,
  orderItems: CartItem[],
  totalPrice: number
): Promise<string> => {
  const newOrder = {
    customer,
    items: orderItems,
    totalPrice,
    paymentStatus: "pending",
  };
  try {
    console.log("[newOrder]", newOrder);
    const order = await OrderModel.insertMany(newOrder);
    if (!order) {
      throw new BadRequestError("Failed to add order");
    }
    return order[0]._id as string;
  } catch (error) {
    throw error;
  }
};

const updatePaymentStatus = async (
  id: string,
  orderTransaction: Partial<SimplifiedTransaction>
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid order ID: ${id}`);
    }

    // Get the existing order first
    const existingOrder = await OrderModel.findById(id);
    if (!existingOrder) {
      throw new NotFoundError(`Order with ID ${id} not found`);
    }
    console.log("[Update Payment Status] existingOrder", existingOrder);
    // Map the transaction data to the paymentDetails structure
    const paymentDetails = {
      transaction_uid: orderTransaction.transaction?.transaction_uid,
      transaction_status: orderTransaction.transaction?.transaction_status,
      transaction_amount: orderTransaction.transaction?.transaction_amount,
      transaction_currency: orderTransaction.transaction?.transaction_currency,
      transaction_date: orderTransaction.transaction?.transaction_date ? new Date(orderTransaction.transaction.transaction_date) : undefined,
      transaction_type: orderTransaction.transaction_type,
      number_of_payments: orderTransaction.payments?.number_of_payments,
      first_payment_amount: orderTransaction.payments?.first_payment_amount,
      rest_payments_amount: orderTransaction.payments?.rest_payments_amount,
      card_holder_name: orderTransaction.customer_info?.card_holder_name,
      customer_uid: orderTransaction.customer_info?.customer_uid,
      terminal_uid: orderTransaction.customer_info?.terminal_uid
    };

    // Determine payment status based on transaction status
    // You may need to adjust this logic based on your specific requirements
    const paymentStatus = orderTransaction.transaction?.transaction_status === "000" ? "paid" : "failed";

    console.log("[Update Payment Status]", { paymentStatus, transactionId: paymentDetails.transaction_uid });
    
    // Update only the necessary fields
    const updated = await OrderModel.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status: paymentStatus,
          paymentDetails: paymentDetails,
          updatedAt: new Date()
        } 
      },
      { new: true }
    );

    if (!updated) {
      throw new NotFoundError(`Order with ID ${id} not found`);
    }
    
    return updated;
  } catch (error) {
    throw error;
  }
};

const checkPaymentStatus = async (orderId: string) => {
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new NotFoundError(`Order with id: ${orderId} not found`);
    }
    return order.paymentStatus;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id: string): Promise<Order> => {
  try {
    const order = (await OrderModel.findById(id)) as Order;
    if (!order) {
      throw new NotFoundError(`Order with id : ${id} Not found`);
    }
    return order;
  } catch (error) {
    throw error;
  }
};

const getOrders = async (limit: number, page: number) => {
  try {
    const orders = await OrderModel
      .find()
      .limit(limit)
      .skip(page * limit);
    if (!orders) {
      throw new NotFoundError("No orders found");
    }
    return orders;
  } catch (error) {
    throw error;
  }
};

// Get order by orderId and transactionUid
const getOrder = async (orderId: string, transactionUid: string) => {
  try {
    const order = await OrderModel.findOne({ _id: orderId, transaction: { transaction_uid: transactionUid } });
    if (!order) {
      throw new NotFoundError(`Order with id: ${orderId} not found`);
    }
    return order;
  } catch (error) {
    throw error;
  }
};
export {
  addOrder,
  updatePaymentStatus,
  checkPaymentStatus,
  getOrderById,
  getOrders,
  getOrder,
};
