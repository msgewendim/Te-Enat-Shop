import mongoose, { Schema } from "mongoose";
import {
  Category,
  Ingredient,
  Instruction,
  Recipe,
} from "../../types/recipe.types";

const IngredientSchema = new Schema<Ingredient>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  quantity: {
    type: String,
    required: true,
  },
  existsInProducts: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const InstructionSchema = new Schema<Instruction>({
  step: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const CategorySchema = new Schema<Category>({
  nameInHebrew: { type: String, required: true },
  nameInEnglish: { type: String, required: true },
});

const recipeSchema = new Schema<Recipe>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  image: {
    type: String,
    required: true,
    validate: [(v: string) => v.length > 0, "An Image is Required"],
  },
  categories: {
    type: [CategorySchema],
    required: true,
    validate: [
      (v: Category[]) => v.length > 0,
      "At least one category should be provided.",
    ],
  },
  ingredients: {
    type: [IngredientSchema],
    required: true,
    validate: [
      (v: Ingredient[]) => v.length > 0,
      "At least one ingredient should be provided.",
    ],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  instructions: {
    type: [InstructionSchema],
    required: true,
    validate: [
      (v: Instruction[]) => v.length > 0,
      "At least one instruction should be provided.",
    ],
  },
  prepTime: {
    type: String,
    required: true,
    min: 0,
  },
  servings: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  cookTime: {
    type: String,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    auto: true,
  },
});

const RecipeModel = mongoose.model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
