import { z } from "zod";

const FeatureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const FeatureObjectSchema = z.object({
  id: z.string().optional(),
  value: z.array(FeatureSchema).min(1, "At least one feature is required"),
});

const PricingSchema = z.object({
  size: z.string().min(1, "Size is required"),
  price: z.number().positive("Price must be positive"),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortDescription: z
    .string()
    .min(5, "Short description must be at least 5 characters")
    .max(1000, "Short description must not exceed 1000 characters"),
  pricing: z
    .array(PricingSchema)
    .min(1, "At least one pricing option is required"),
  image: z.string().url("Invalid image URL"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  features: FeatureObjectSchema,
});

export type ProductFormData = z.infer<typeof ProductSchema>;
