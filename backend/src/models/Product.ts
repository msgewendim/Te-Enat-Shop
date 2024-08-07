import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type : mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;