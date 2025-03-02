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
    orderItems,
    totalPrice,
    paymentStatus: "pending",
  };
  try {
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
    // const { paymentStatus, ...orderData } = await this.getOrderById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid order ID: ${id}`);
    }
    const updatedOrder = {
      paymentStatus: "succeeded",
      ...orderTransaction,
    };
    const updated = await OrderModel.findByIdAndUpdate(
      id,
      { $set: updatedOrder },
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
export {
  addOrder,
  updatePaymentStatus,
  checkPaymentStatus,
  getOrderById,
  getOrders,
};
