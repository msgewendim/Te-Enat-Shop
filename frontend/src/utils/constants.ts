import { Category, SubCategory } from "../client/types.gen";
import { dessert, hotShiro, kurkum, shiro, cookies } from "./imageFiles";

// Define types for category mappings
type CategoryMapping = {
  [key: string]: Category[] | string[] | string | SubCategory[];
};

// Product categories
const productCategories: Category[] = [
  { nameInHebrew: "קמחים", nameInEnglish: "flours" },
  { nameInHebrew: "קטניות", nameInEnglish: "legumes" },
  { nameInHebrew: "משקאות", nameInEnglish: "beverages" },
  { nameInHebrew: "תבלינים", nameInEnglish: "spices" },
  { nameInHebrew: "שונות", nameInEnglish: "others" },
];

const productCategoriesMapping: CategoryMapping = {
  flours: "קמחים",
  legumes: "קטניות",
  beverages: "משקאות",
  spices: "תבלינים",
  others: "שונות",
};
const productSubCategoriesMapping: CategoryMapping = {
  spices: [
    { nameInHebrew: "בסיס", nameInEnglish: "base" },
    { nameInHebrew: "תערובות תבלינים", nameInEnglish: "spice-blends" },
    { nameInHebrew: "תבלינים מיוחדים", nameInEnglish: "special-spices" },
    { nameInHebrew: "תבליני אורז", nameInEnglish: "rice-spices" },
    {
      nameInHebrew: "תבלינים משפרי בריאות",
      nameInEnglish: "health-enhancing-spices",
    },
  ],
  beverages: [
    { nameInHebrew: "קפה", nameInEnglish: "coffee" },
    { nameInHebrew: "תה", nameInEnglish: "tea" },
    { nameInHebrew: "אלכוהול", nameInEnglish: "alcohol" },
  ],
  flours: [
    { nameInHebrew: "טף", nameInEnglish: "teff" },
    { nameInHebrew: "זנים מיוחדים", nameInEnglish: "special-varieties" },
    { nameInHebrew: "שירו", nameInEnglish: "shiro" },
  ],
  packages: [
    { nameInHebrew: "אינג'רה", nameInEnglish: "enjera" },
    { nameInHebrew: "אפייה", nameInEnglish: "baking" },
    { nameInHebrew: "קינוחים", nameInEnglish: "desserts" },
    { nameInHebrew: "תבשילים", nameInEnglish: "stews" },
  ],
};

// Recipe categories
const recipeCategories: Category[] = [
  { nameInHebrew: "איתיופי", nameInEnglish: "Ethiopian" },
  { nameInHebrew: "טבעוני", nameInEnglish: "Vegetarian" },
  { nameInHebrew: "בשרי", nameInEnglish: "Meat" },
  { nameInHebrew: "ארוחת בוקר", nameInEnglish: "Breakfast" },
  { nameInHebrew: "ארוחת ערב", nameInEnglish: "Dinner" },
];

const recipeCategoriesMapping: CategoryMapping = {
  Ethiopian: "איתיופי",
  Vegetarian: "טבעוני",
  Meat: "בשרי",
  Breakfast: "ארוחת בוקר",
  Dinner: "ארוחת ערב",
};

const recipeSubCategoriesMapping: CategoryMapping = {
  Ethiopian: ["איתיופי", "איתיופי מוכנים"],
  Vegetarian: ["טבעוני", "טבעוני מוכנים"],
  Meat: ["בשרי", "בשרי מוכנים"],
  Breakfast: ["ארוחת בוקר", "ארוחת בוקר מוכנות"],
  Dinner: ["ארוחת ערב", "ארוחת ערב מוכנות"],
};

// Generic function to translate categories
const translateCategories = <T extends string>(
  categories: T[],
  categoryMapping: CategoryMapping
): string[] => {
  return categories.map((cat) => categoryMapping[cat] || cat) as string[];
};

// Specific functions for products and recipes
const translateProductCategories = (categories: string[]): string[] =>
  translateCategories(categories, productCategoriesMapping);

const translateRecipeCategories = (categories: string[]): string[] =>
  translateCategories(categories, recipeCategoriesMapping);

// Types for category keys
type ProductCategoryKey = keyof typeof productCategoriesMapping;
type RecipeCategoryKey = keyof typeof recipeCategoriesMapping;

// Type for top categories
type TopCategory = {
  _id: string;
  nameInHebrew: string;
  nameInEnglish: string;
  image: string;
};
const categoryPhoto = [shiro, hotShiro, cookies, kurkum, dessert];
const ourTopCategories = productCategories
  .filter((category) => category.nameInEnglish !== "packages")
  .map((category, idx) => {
    return {
      _id: idx + "12002",
      nameInHebrew: category.nameInHebrew,
      nameInEnglish: category.nameInEnglish,
      image: categoryPhoto[idx],
    };
  });

export {
  productCategories,
  productCategoriesMapping,
  translateProductCategories,
  recipeCategories,
  recipeCategoriesMapping,
  translateRecipeCategories,
  ourTopCategories,
  TopCategory,
  ProductCategoryKey,
  RecipeCategoryKey,
  CategoryMapping,
  productSubCategoriesMapping,
  recipeSubCategoriesMapping,
};
