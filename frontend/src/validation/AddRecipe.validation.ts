import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.string().min(1, "Ingredient quantity is required"),
      })
    )
    .min(1, "At least one ingredient is required"),
  instructions: z
    .array(
      z.object({
        step: z.number(),
        description: z.string().min(1, "Instruction description is required"),
      })
    )
    .min(1, "At least one instruction is required"),
  prepTime: z.string().min(1, "Preparation time is required"),
  servings: z.number().positive("Servings must be positive"),
  image: z.string().url("Invalid image URL"),
});

export type RecipeSchemaValidation = z.infer<typeof RecipeSchema>;
