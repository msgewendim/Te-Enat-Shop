import { Package, Product } from "./product.types";
import { Recipe } from "./recipe.types";

type RandomItem = Package | Product | Recipe;
type RandomItemsResponse = {
  items: RandomItem[];
  totalPages: number;
  currentPage: number;
};

type SuccessResponse = {
  success: boolean;
  message: string;
  data?: RandomItem | RandomItem[];
};
export type TobiaWishList = {
  email: string;
};
type ErrorResponse = {
  success: boolean;
  message: string;
};
export type DesignProductFormData = {
  email: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  birthDate: Date;
};

export type EarlyAdoptersFormData = {
  email: string;
  fullName: string;
  street: string;
  city: string;
  phone: string;
  birthDate?: Date;
};
export type NewsLetterData = {
  email: string;
  fullName: string;
  city: string;
};

export { RandomItem, RandomItemsResponse, SuccessResponse, ErrorResponse };
