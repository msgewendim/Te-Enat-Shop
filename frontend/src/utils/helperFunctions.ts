import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  CartItem,
  Category,
  Feature,
  Ingredient,
  SubCategory,
} from "../client";
import { recipeCategories, recipeSubCategoriesMapping } from "./constants";
import { productCategories } from "./constants";
import { productSubCategoriesMapping } from "./constants";

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
const getTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (acc, { quantity, price }) => acc + price * quantity,
    0
  );
};

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

const removeItemFromCartList = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] =>
  cartItems
    .map((cartItem) =>
      cartItem.item._id === itemToRemove.item._id &&
      cartItem.size === itemToRemove.size
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
    .filter((cartItem) => cartItem.quantity > 0);

const addItemToCartList = (
  cartList: CartItem[],
  newItem: CartItem
): CartItem[] => {
  const existingItem = cartList.find(
    (cartItem) =>
      cartItem.item._id === newItem.item._id && cartItem.size === newItem.size
  );

  return existingItem
    ? cartList.map((cartItem) =>
        cartItem === existingItem
          ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
          : cartItem
      )
    : [...cartList, newItem];
};

export const addItemToOrderList = (
  orderList: CartItem[],
  newItem: CartItem
): CartItem[] => {
  const existingItem = orderList.find(
    (orderItem) =>
      orderItem.item.name === newItem.item.name &&
      orderItem.size === newItem.size
  );

  return existingItem
    ? orderList.map((orderItem) =>
        orderItem === existingItem
          ? { ...orderItem, quantity: orderItem.quantity + newItem.quantity }
          : orderItem
      )
    : [...orderList, newItem];
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
  addItemToCartList,
  createBanner,
  createRecipeCardImage,
  divideFeatures,
  ScrollToTop,
  removeItemFromCartList,
  getTotalPrice,
  randomizeArray,
  subCategoriesByParentCategoryKey,
};
