import { Package } from "../../types/product.types";
import Joi from "joi";

const validateAddPackage = (packageData: Package) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    cookingTime: Joi.number().required(),
    ingredientsQuantity: Joi.number().required(),
    peopleQuantity: Joi.number().required(),
  });
  return schema.validate(packageData);
};

const validateUpdatePackage = (packageData: Package) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    image: Joi.string().optional(),
    price: Joi.number().optional(),
    cookingTime: Joi.number().optional(),
    ingredientsQuantity: Joi.number().optional(),
    peopleQuantity: Joi.number().optional(),
  });
  return schema.validate(packageData);
};

export { validateAddPackage, validateUpdatePackage };
