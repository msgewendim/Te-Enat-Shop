import orderModel from "../models/Order";
import { Client, IOrder, OrderItem } from "../utils/interfaces/IOrder";

class OrderDal implements IOrder {
  // userInfo: Client;
  // products: OrderItem[];
  // totalPrice: number;
  // orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";

  async addOrder(userInfo: Client, products: OrderItem[], totalPrice: number) {
    const newOrder = {
      userInfo,
      products,
      totalPrice,
      orderStatus: "pending",
    };
    try {
      await orderModel.create(newOrder);
    } catch (error) {
      throw new Error(`Error creating order in DB: ${error} `);
    }
  }
  async updateOrder (id: string, userInfo: Client, products: OrderItem[], totalPrice: number) {
    const updatedOrder = {
      userInfo,
      products,
      totalPrice,
      orderStatus: "pending",
    };
    try {
      await orderModel.findByIdAndUpdate(id, updatedOrder);
    } catch (error) {
      throw new Error(`Error creating order in DB: ${error} `);
    }
  }
}

export default OrderDal;
