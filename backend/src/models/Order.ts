import mongoose from "mongoose";
import { OrderItem } from "../utils/interfaces/IOrder";

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
    orderStatus: {
      type: "string",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
