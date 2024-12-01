import { ObjectId } from "mongoose";
import { ClientDetails } from "./order.types";
import { Product } from "./product.types";

interface Recipe {
  _id: ObjectId | null;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTime: string;
  servings: number;
  cookTime: string;
  difficulty: "easy" | "medium" | "hard";
  categories: Category[];
  createdAt?: Date;
}

interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}
interface Instruction {
  step: number;
  description: string;
  _id?: string;
}
interface Category {
  nameInHebrew: string;
  nameInEnglish: string;
}
interface Review {
  _id: string;
  userId: ClientDetails["name"];
  recipeId: Recipe["_id"];
  rating: number;
  comment: string;
  createdAt: Date;
}

export type { Recipe, Category, Review, Ingredient, Instruction };
