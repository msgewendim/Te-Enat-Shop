import mongoose from "mongoose";
import { OrderItem } from "../utils/interfaces/IOrder";

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      type: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
      },
      required: true,
    },
    products: {
      type: Array<OrderItem>,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
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
