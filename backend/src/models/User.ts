import { Order } from "../../types/order.types";
import mongoose from "mongoose";

export interface User {
  _id: string;
  email: string;
  mobile: boolean;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  role: string;
  orders: Order["_id"];
  created_at: Date;
  updated_at: Date;
}
const userSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    mobile: { type: "string", required: true },
    address: {
      street: { type: "string", required: true },
      city: { type: "string", required: true },
      zip: { type: "string" },
    },
    role: { type: "string", required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
    cart: {
      type: Array,
      default: [],
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<User>("users", userSchema);
export default userModel;
