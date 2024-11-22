import mongoose, { Schema } from "mongoose";
import {
  Category,
  FeatureObject,
  Pricing,
  Product,
  Feature,
  SubCategory,
  ProductSize,
} from "../../types/product.types";

const FeatureSchema = new Schema<Feature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const FeatureObjectSchema = new Schema<FeatureObject>({
  id: { type: String },
  value: [FeatureSchema],
});

const SizeSchema = new Schema<ProductSize>({
  sizeName: { type: String, required: true },
  sizeQuantity: { type: String, required: true },
});

const PricingSchema = new Schema<Pricing>({
  size: SizeSchema,
  price: { type: Number, required: true },
});

const SubCategorySchema = new Schema<SubCategory>({
  nameInHebrew: { type: String, required: true },
  nameInEnglish: { type: String, required: true },
  nameOfParentCategory: { type: String, required: true },
});

const CategorySchema = new Schema<Category>({
  nameInHebrew: { type: String, required: true },
  nameInEnglish: { type: String, required: true },
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
    type: [CategorySchema],
    required: true,
    validate: [
      (v: Category[]) => v.length > 0,
      "At least one category should be provided.",
    ],
  },
  subCategories: {
    type: [SubCategorySchema],
    default: [],
  },
  features: {
    type: FeatureObjectSchema,
    default: () => ({ id: "", value: [] }),
  },
  totalSales: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
