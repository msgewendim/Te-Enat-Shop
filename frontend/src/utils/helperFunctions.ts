import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Category,
  Feature,
  Ingredient,
  SubCategory,
} from "../client/types.gen";
import { recipeCategories, recipeSubCategoriesMapping , productCategories , productSubCategoriesMapping } from "./constants";

const createBanner = (image: string): React.CSSProperties => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "12vh",
  width: "100%",
  marginTop: "50px",
});

interface StyleProps {
  [key: string]: string;
}

const createRecipeCardImage = (
  image: string,
  width: string = "390px",
  height: string = "300px",
  additionalStyles: StyleProps = {}
): React.CSSProperties => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: "10px",
  height,
  width,
  marginBottom: "10px",
  ...additionalStyles,
});


// divide the nutrition of a product with in the description object
const divideFeatures = (features: Feature[]) => {
  const leftFeatures: Feature[] = [];
  const rightFeatures: Feature[] = [];

  features.forEach((feature, index) => {
    if (index % 2 === 0) {
      leftFeatures.push(feature);
    } else {
      rightFeatures.push(feature);
    }
  });

  return { leftFeatures, rightFeatures };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const randomizeArray = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const subCategoriesByParentCategoryKey = (
  parentCategoryNameKey: string,
  type: "recipe" | "product"
): SubCategory[] => {
  const { subCategoriesMapping } = categoriesBasedOnType(type);
  return (subCategoriesMapping[parentCategoryNameKey] || []) as SubCategory[];
};
export const isCategorySelected = (category: Category | SubCategory, type: "mainCategory" | "subCategory", selectedMainCategories: Category[], selectedSubCategories: SubCategory[]) => {
  if (type === "mainCategory") {
    const isSelected = selectedMainCategories.find(cat => cat.nameInEnglish === category.nameInEnglish);
    return isSelected ? true : false;
  } else {
    const isSelected = selectedSubCategories.find(subCat => subCat.nameInEnglish === category.nameInEnglish);
    return isSelected ? true : false;
  }
}
export const makeBreakLine = (text: string): string[] => {
  return text.split('\n')
}

function categoriesBasedOnType(type: "recipe" | "product") {
  return type === "recipe"
    ? {
        categories: recipeCategories,
        subCategoriesMapping: recipeSubCategoriesMapping,
      }
    : {
        categories: productCategories,
        subCategoriesMapping: productSubCategoriesMapping,
      };
}
const existingProductsFromRecipe = (ingredients: Ingredient[]) => {
  const existingProducts = ingredients
    .filter((ingredient) => ingredient.existsInProducts)
    .map((ingredient) => ingredient.name);
  return existingProducts;
};
export {
  existingProductsFromRecipe,
  categoriesBasedOnType,
  createBanner,
  createRecipeCardImage,
  divideFeatures,
  ScrollToTop,
  randomizeArray,
  subCategoriesByParentCategoryKey,
};
