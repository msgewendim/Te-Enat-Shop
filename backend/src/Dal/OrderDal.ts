import orderModel from "../models/Order";
import { Client, IOrder, OrderItem } from "../utils/interfaces/IOrder";

class OrderDal implements IOrder {
  async addOrder(userInfo: Client, products: OrderItem[], totalPrice: number) {
    const newOrder = {
      userDetails : {
        ...userInfo,
        email : userInfo.emails[0]
      },
      products,
      totalPrice,
      orderStatus: "pending",
    };
    try {
      const order = await orderModel.insertMany(newOrder)
      console.log("Order created successfully");
      return order[0]._id;
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
