import { dessert, hotShiro, kurkum, shiro, cookies } from "./imageFiles";
// Define types for category mappings
type CategoryMapping = {
  [key: string]: string;
};

// Define types for category objects
type CategoryObject = {
  name: string;
  value: string;
};

// Product categories
const productCategories: CategoryObject[] = [
  { name: "קמחים", value: "flours" },
  { name: "קטניות", value: "legumes" },
  { name: "משקאות", value: "beverages" },
  { name: "תבלינים", value: "spices" },
  { name: "מארזים", value: "packages" },
  { name: "שונות", value: "others" },
];

const productCategoriesMapping: CategoryMapping = {
  flours: "קמחים",
  legumes: "קטניות",
  beverages: "משקאות",
  spices: "תבלינים",
  others: "שונות",
};

// Recipe categories
const recipeCategories: CategoryObject[] = [
  { name: "איתיופי", value: "Ethiopian" },
  { name: "טבעוני", value: "Vegetarian" },
  { name: "בשרי", value: "Meat" },
  { name: "ארוחת בוקר", value: "Breakfast" },
  { name: "ארוחת ערב", value: "Dinner" },
];

const recipeCategoriesMapping: CategoryMapping = {
  Ethiopian: "איתיופי",
  Vegetarian: "טבעוני",
  Meat: "בשרי",
  Breakfast: "ארוחת בוקר",
  Dinner: "ארוחת ערב",
};

// Create reverse mappings
const createReverseMapping = (mapping: CategoryMapping): CategoryMapping =>
  Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value, key])
  );

const reverseProductCategoriesMapping = createReverseMapping(
  productCategoriesMapping
);
const reverseRecipeCategoriesMapping = createReverseMapping(
  recipeCategoriesMapping
);

// Generic function to translate categories
const translateCategories = <T extends string>(
  categories: T | T[],
  categoryMapping: CategoryMapping
): string | string[] => {
  if (Array.isArray(categories)) {
    return categories.map((cat) => categoryMapping[cat] || cat);
  }
  return categoryMapping[categories] || categories;
};

// Specific functions for products and recipes
const translateProductCategories = (
  categories: string | string[]
): string | string[] =>
  translateCategories(categories, productCategoriesMapping);

const translateRecipeCategories = (
  categories: string | string[]
): string | string[] =>
  translateCategories(categories, recipeCategoriesMapping);

// Types for category keys
type ProductCategoryKey = keyof typeof productCategoriesMapping;
type RecipeCategoryKey = keyof typeof recipeCategoriesMapping;

// Type for top categories
type TopCategory = {
  _id: string;
  name: string;
  value: string;
  image: string;
};
const categoryPhoto = [shiro, hotShiro, cookies, kurkum, dessert];
const ourTopCategories = productCategories
  .filter((category) => category.value !== "packages")
  .map((category, idx) => {
    return {
      _id: idx + "12002",
      name: category.name,
      value: category.value,
      image: categoryPhoto[idx],
    };
  });

export {
  productCategories,
  productCategoriesMapping,
  reverseProductCategoriesMapping,
  translateProductCategories,
  recipeCategories,
  recipeCategoriesMapping,
  reverseRecipeCategoriesMapping,
  translateRecipeCategories,
  ourTopCategories,
  TopCategory,
  ProductCategoryKey,
  RecipeCategoryKey,
  CategoryMapping,
  CategoryObject,
};
