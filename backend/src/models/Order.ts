import mongoose from "mongoose";
import { Order, OrderItem } from "../../types/order.types";

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      name: { type: "string", required: true },
      email: { type: "string", required: true },
      mobile: { type: "string", required: true },
      address: { type: "string", required: true },
      city: { type: "string", required: true },
      zip: { type: "string", required: true },
    },
    products: {
      type: Array<OrderItem>,
      required: true,
    },
    totalPrice: {
      type: "number",
      required: true,
    },
    paymentStatus: {
      type: "string",
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model<Order>("orders", orderSchema);
export default orderModel;
