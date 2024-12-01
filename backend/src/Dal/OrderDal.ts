import mongoose from "mongoose";
import {
  ClientDetails,
  Order,
  OrderItem,
  OrderTransaction,
} from "../../types/order.types";
import orderModel from "../models/OrderSchema";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

const addOrder = async (
  userInfo: ClientDetails,
  products: OrderItem[],
  totalPrice: number
) => {
  const newOrder = {
    userDetails: {
      ...userInfo,
      email: userInfo.emails[0],
    },
    products,
    totalPrice,
    paymentStatus: "pending",
  };
  try {
    const order = await orderModel.insertMany(newOrder);
    if (!order) {
      throw new BadRequestError("Failed to add order");
    }
    return order[0]._id;
  } catch (error) {
    throw error;
  }
};

const updatePaymentStatus = async (
  id: string,
  orderTransaction: Partial<OrderTransaction>
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
    const updated = await orderModel.findByIdAndUpdate(
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
    const order = (await orderModel.findById(id)) as Order;
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
    const orders = await orderModel
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
