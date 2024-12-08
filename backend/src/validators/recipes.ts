import {
  Category,
  Ingredient,
  Instruction,
  Recipe,
} from "../../types/recipe.types";
import Joi from "joi";

const categorySchema = Joi.object<Category>({
  nameInEnglish: Joi.string().required(),
  nameInHebrew: Joi.string().required(),
  _id: Joi.string().optional(),
});
const instructionSchema = Joi.object<Instruction>({
  description: Joi.string().required(),
  step: Joi.number().required(),
});
const ingredientSchema = Joi.object<Ingredient>({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
});
const validateAddRecipe = (recipeData: Recipe) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.array().items(ingredientSchema).required().min(1),
    instructions: Joi.array().items(instructionSchema).required().min(1),
    prepTime: Joi.string().required(),
    servings: Joi.number().required(),
    difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
    categories: Joi.array().items(categorySchema).required().min(1),
  });
  return schema.validate(recipeData);
};

const validateUpdateRecipe = (recipeData: Recipe) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    image: Joi.string().optional(),
    description: Joi.string().optional(),
    ingredients: Joi.array().optional(),
    instructions: Joi.array().optional(),
    prepTime: Joi.string().optional(),
    servings: Joi.number().optional(),
    difficulty: Joi.string().valid("Easy", "Medium", "Hard").optional(),
    categories: Joi.array().optional(),
  });
  return schema.validate(recipeData);
};

export { validateAddRecipe, validateUpdateRecipe };
