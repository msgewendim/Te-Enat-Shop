import { dessert, hotShiro, kurkum, shiro } from "./data";
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
  image: string;
};

const ourTopCategories = [
  {
    _id: "123",
    name: "קמחים",
    image: hotShiro,
  },
  {
    _id: "124",
    name: "תבלינים",
    image: kurkum,
  },
  {
    _id: "125",
    name: "קטניות",
    image: shiro,
  },
  {
    _id: "126",
    name: "משקאות",
    image: dessert,
  },
  {
    _id: "126",
    name: "מארזים",
    image: dessert,
  },
];

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
