import { ObjectId } from "mongoose";

interface Recipe {
  _id: ObjectId | null;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTime: string;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  categories: Category[];
  createdAt?: Date;
}

interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
  existsInProducts: boolean;
}
interface Instruction {
  step: number;
  description: string;
  _id?: string;
}
interface Category {
  nameInHebrew: string;
  nameInEnglish: string;
  _id?: string;
}

export type { Recipe, Category, Ingredient, Instruction };
