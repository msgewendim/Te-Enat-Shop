import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartItem, Feature } from "../client";
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

function categoriesBasedOnType(type: string) {
  return type === "recipes"
    ? {
        categories: recipeCategories,
        subCategoriesMapping: recipeSubCategoriesMapping,
      }
    : {
        categories: productCategories,
        subCategoriesMapping: productSubCategoriesMapping,
      };
}

export {
  categoriesBasedOnType,
  addItemToCartList,
  createBanner,
  createRecipeCardImage,
  divideFeatures,
  ScrollToTop,
  removeItemFromCartList,
  getTotalPrice,
  randomizeArray,
};
