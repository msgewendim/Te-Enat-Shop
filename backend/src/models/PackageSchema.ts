import mongoose, { Schema } from "mongoose";
import { Package } from "../../types/product.types";

const packageSchema = new Schema<Package>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  ingredientsQuantity: {
    type: Number,
    required: true,
  },
  peoplesQuantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
});

const ProductModel = mongoose.model<Package>("Package", packageSchema);

export default ProductModel;
