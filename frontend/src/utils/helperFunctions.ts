import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartItem, Feature, Product } from "../client";

const createBanner = (image: string) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "20vh",
    width: "100%",
    marginTop: "50px",
  };
  return bgImage;
};
interface StyleProps {
  [key: string]: string;
}

const createRecipeCardImage = (
  image: string,
  width: string = "390px",
  height: string = "300px",
  additionalStyles: StyleProps = {}
): React.CSSProperties => {
  return {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    height,
    width,
    marginBottom: "10px",
    ...additionalStyles,
  };
};
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
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
// Randomize products
const randomizeArray = (array: Product[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const removeItemFromCartList = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  return cartItems
    .map((item) => {
      if (
        item.product._id === itemToRemove.product._id &&
        item.size === itemToRemove.size
      ) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
};

const addItemToCartList = (
  cartList: CartItem[],
  newItem: CartItem
): CartItem[] => {
  const existingItemIndex = cartList.findIndex(
    (item) =>
      item.product._id === newItem.product._id && item.size === newItem.size
  );

  if (existingItemIndex === -1) {
    // If the item doesn't exist, add it to the cart
    return [...cartList, newItem];
  } else {
    // If the item exists, update its quantity
    return cartList.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item
    );
  }
};

export {
  addItemToCartList,
  createBanner,
  createRecipeCardImage,
  divideFeatures,
  ScrollToTop,
  removeItemFromCartList,
  getTotalPrice,
  randomizeArray,
};
