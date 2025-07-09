import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

export const InstructionSchema = z.object({
  step: z.number(),
  description: z.string().min(1, "Description is required"),
});

const CategorySchema = z.object({
  nameInEnglish: z.string().min(1, "Category name is required"),
  nameInHebrew: z.string().min(1, "Category name is required"),
});
export const RecipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  categories: z.array(CategorySchema).min(1, "At least one category is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  ingredients: z.array(IngredientSchema).min(1, "At least one ingredient is required"),
  instructions: z.array(InstructionSchema).min(1, "At least one instruction is required"),
  prepTime: z.string().min(1, "Preparation time is required"),
  servings: z.number().positive("Servings must be positive"),
  image: z.string().url("Invalid image URL"),
});

export type RecipeSchemaValidation = z.infer<typeof RecipeSchema>;
