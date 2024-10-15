import { ClientDetails } from "./order.types";
import { Product } from "./product.types";
interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  categories?: Category["name"][];
  relatedRecipes?: Partial<Recipe>[];
  reviews?: Review[];
  createdAt: Date;
}

interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}

interface Category {
  _id?: string;
  name: string;
  images?: string[];
  recipes?: Recipe["_id"][];
  products?: Product["_id"][];
}
interface Review {
  _id: string;
  userId: ClientDetails["name"];
  recipeId: Recipe["_id"];
  rating: number;
  comment: string;
  createdAt: Date;
}

export type { Recipe, Category, Review, Ingredient };
