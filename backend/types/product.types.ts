import mongoose, { ObjectId } from "mongoose";

export interface Product {
  _id: ObjectId | null;
  name: string;
  image: string;
  shortDescription: string;
  pricing: Array<Pricing>;
  categories: Category[];
  features: FeatureObject;
  relatedProducts: mongoose.Types.ObjectId[];
  totalSales?: number;
}
export interface Feature {
  title: string;
  description: string;
}

export interface FeatureObject {
  id: string;
  value: Feature[];
}

export interface Category {
  /**
   * The name of the product category in Hebrew
   */
  name: string;
  /**
   * The value of the product category in English
   */
  value: string;
}

export interface Pricing {
  /**
   * The weight option for the product.
   */
  size: string;
  /**
   * The price of the product for the given size.
   */
  price: number;
}

export interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  rate: number;
  shortDescription: string;
  imageSize?: number;
}

export interface Package {
  _id: ObjectId | null;
  name: string;
  image: string;
  price: number;
  cookingTime: number;
  ingredientsQuantity: number;
  peoplesQuantity: number;
}
