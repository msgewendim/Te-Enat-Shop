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

type ErrorResponse = {
  success: boolean;
  message: string;
};

export { RandomItem, RandomItemsResponse, SuccessResponse, ErrorResponse };
