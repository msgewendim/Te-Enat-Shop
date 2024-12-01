import Joi from "joi";
import {
  Product,
  Pricing,
  Category,
  SubCategory,
  FeatureObject,
  Feature,
} from "../../types/product.types";

const validateAddProduct = (productData: Product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    shortDescription: Joi.string().required(),
    pricing: Joi.array()
      .items(
        Joi.object<Pricing>({
          price: Joi.number().required(),
          size: Joi.string().required(),
        })
      )
      .required(),
    categories: Joi.array()
      .items(
        Joi.object<Category>({
          nameInEnglish: Joi.string().required(),
          nameInHebrew: Joi.string().required(),
        })
      )
      .required(),
    subCategories: Joi.array()
      .items(
        Joi.object<SubCategory>({
          nameInEnglish: Joi.string().required(),
          nameInHebrew: Joi.string().required(),
          nameOfParentCategory: Joi.string().required(),
        })
      )
      .optional(),
    features: Joi.object<FeatureObject>({
      _id: Joi.string().optional(),
      value: Joi.array()
        .items(
          Joi.object<Feature>({
            description: Joi.string().required(),
            title: Joi.string().required(),
          })
        )
        .required()
        .min(1),
    }).required(),
  });
  return schema.validate(productData);
};

const validateUpdateProduct = (productData: Product) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    image: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    pricing: Joi.array().optional(),
    categories: Joi.array().optional(),
    subCategories: Joi.array().optional(),
    features: Joi.object().optional(),
  });
  return schema.validate(productData);
};

export { validateAddProduct, validateUpdateProduct };
