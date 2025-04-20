import { z } from "zod";

export const PackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL"),
  price: z.number().positive("Price must be positive"),
  cookingTime: z.number().positive("Cooking time must be positive"),
  ingredientsQuantity: z
    .number()
    .positive("Ingredients quantity must be positive"),
  peoplesQuantity: z.number().positive("Peoples quantity must be positive"),
});

export type PackageFormData = z.infer<typeof PackageSchema>;
