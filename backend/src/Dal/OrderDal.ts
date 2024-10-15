import mongoose from "mongoose";
import {
  ClientDetails,
  Order,
  OrderItem,
  OrderTransaction,
} from "../../types/order.types";
import orderModel from "../models/Order";

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
    console.log("Order created successfully");
    return order[0]._id;
  } catch (error) {
    throw new Error(`Error creating order in DB: ${error} `);
  }
};

const updatePaymentStatus = async (
  id: string,
  orderTransaction: Partial<OrderTransaction>
) => {
  try {
    // const { paymentStatus, ...orderData } = await this.getOrderById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid order ID: ${id}`);
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
      throw new Error(`Order with ID ${id} not found`);
    }
    console.log(updated, "updated order");
    return updated;
  } catch (error) {
    throw new Error(`Error creating order in DB: ${error} `);
  }
};

const checkPaymentStatus = async (orderId: string) => {
  try {
    const order = await getOrderById(orderId);
    return order.paymentStatus;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id: string): Promise<Order> => {
  try {
    const order = (await orderModel.findById(id)) as Order;
    if (!order) {
      throw new Error(`Order with id : ${id} Not found`);
    }
    console.log(order, `Order with id : ${id}`);
    return order;
  } catch (error) {
    throw error;
  }
};

export { addOrder, updatePaymentStatus, checkPaymentStatus, getOrderById };
