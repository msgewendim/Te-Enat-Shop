import { Category, SubCategory } from "../client/types.gen";
import shiro from "../assets/shiro.jpg";
import hotShiro from "../assets/hot-shiro.jpg";
import cookies from "../assets/cookies.jpg";
import kurkum from "../assets/kurkum.jpg";
import dessert from "../assets/dessert.jpg";

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
  { nameInHebrew: "Tobia", nameInEnglish: "Tobia" },
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
    { nameInHebrew: "בסיס", nameInEnglish: "base", nameOfParentCategory: "spices" },
    { nameInHebrew: "תערובות תבלינים", nameInEnglish: "spice-blends", nameOfParentCategory: "spices" },
    { nameInHebrew: "תבלינים מיוחדים", nameInEnglish: "special-spices", nameOfParentCategory: "spices" },
    { nameInHebrew: "תבליני אורז", nameInEnglish: "rice-spices", nameOfParentCategory: "spices" },
    {
      nameInHebrew: "תבלינים משפרי בריאות",
      nameInEnglish: "health-enhancing-spices",
      nameOfParentCategory: "spices",
    },
  ],
  beverages: [
    { nameInHebrew: "קפה", nameInEnglish: "coffee", nameOfParentCategory: "beverages" },
    { nameInHebrew: "תה", nameInEnglish: "tea", nameOfParentCategory: "beverages" },
    { nameInHebrew: "אלכוהול", nameInEnglish: "alcohol", nameOfParentCategory: "beverages" },
  ],
  flours: [
    { nameInHebrew: "טף", nameInEnglish: "teff", nameOfParentCategory: "flours" },
    { nameInHebrew: "זנים מיוחדים", nameInEnglish: "special-varieties", nameOfParentCategory: "flours" },
    { nameInHebrew: "שירו", nameInEnglish: "shiro", nameOfParentCategory: "flours" },
  ],
  packages: [
    { nameInHebrew: "אינג'רה", nameInEnglish: "enjera", nameOfParentCategory: "packages" },
    { nameInHebrew: "אפייה", nameInEnglish: "baking", nameOfParentCategory: "packages" },
    { nameInHebrew: "קינוחים", nameInEnglish: "desserts", nameOfParentCategory: "packages" },
    { nameInHebrew: "תבשילים", nameInEnglish: "stews", nameOfParentCategory: "packages" },
  ],
};

// Recipe categories
const recipeCategories: Category[] = [
  { nameInHebrew: "תבשילים", nameInEnglish: "stew" },
  { nameInHebrew: "אינג'רה", nameInEnglish: "injera" },
  { nameInHebrew: "טיבס", nameInEnglish: "tibs" },
  { nameInHebrew: "סלטים", nameInEnglish: "salad" },
  { nameInHebrew: "לחמים", nameInEnglish: "bread" },
  { nameInHebrew: "קינוחים", nameInEnglish: "dessert" },
  { nameInHebrew: "ללא גלוטן", nameInEnglish: "glutenFree" },
];

const recipeCategoriesMapping: CategoryMapping = {
  stews: "תבשילים",
  injera: "אינג'רה",
  tibs: "טיבס",
  salads: "סלטים",
  desserts: "קינוחים",
  glutenFree: "ללא גלוטן",
};

const recipeSubCategoriesMapping: CategoryMapping = {
  s: ["איתיופי", "איתיופי מוכנים"],
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
