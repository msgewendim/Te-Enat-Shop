import {
  Category,
  Ingredient,
  Instruction,
  Recipe,
} from "../../types/recipe.types";
import Joi from "joi";

const validateAddRecipe = (recipeData: Recipe) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.array()
      .items(
        Joi.object<Ingredient>({
          name: Joi.string().required(),
          quantity: Joi.string().required(),
        })
      )
      .required()
      .min(1),
    instructions: Joi.array()
      .items(
        Joi.object<Instruction>({
          description: Joi.string().required(),
          step: Joi.number().required(),
        })
      )
      .required()
      .min(1),
    prepTime: Joi.string().required(),
    servings: Joi.number().required(),
    cookTime: Joi.string().required(),
    difficulty: Joi.string().valid("easy", "medium", "hard").required(),
    categories: Joi.array()
      .items(
        Joi.object<Category>({
          nameInEnglish: Joi.string().required(),
          nameInHebrew: Joi.string().required(),
        })
      )
      .required()
      .min(1),
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
  });
  return schema.validate(recipeData);
};

export { validateAddRecipe, validateUpdateRecipe };
