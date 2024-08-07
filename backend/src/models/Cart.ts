import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const cartModel = mongoose.model('cart', cartSchema)
export default cartModel;