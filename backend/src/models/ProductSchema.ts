import mongoose, { Schema } from "mongoose";
import {
  Category,
  FeatureObject,
  Pricing,
  Product,
  Feature,
} from "../../types/product.types";

// Define the Feature schema
const FeatureSchema = new Schema<Feature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Define the FeatureObject schema
const FeatureObjectSchema = new Schema<FeatureObject>({
  id: { type: String },
  value: [FeatureSchema],
});

const PricingSchema = new Schema<Pricing>({
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new Schema<Product>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  pricing: {
    type: [PricingSchema],
    required: true,
    validate: [
      (v: any[]) => v.length > 0,
      "At least one size and price item should be provided.",
    ],
  },
  image: {
    type: String,
    required: true,
    validate: [(v: string) => v.length > 0, "An Image is Required"],
  },
  categories: {
    type: [String],
    required: true,
    validate: [
      (v: string[]) => v.length > 0,
      "At least one category should be provided.",
    ],
  },
  features: {
    type: FeatureObjectSchema,
    default: () => ({ id: "", value: [] }),
  },
  relatedProducts: {
    type: [Schema.Types.ObjectId],
    default: [],
    validate: [
      (v: mongoose.Types.ObjectId[]) => v.length <= 8,
      "Number of related products should not exceed 8.",
    ],
  },
  totalSales: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
