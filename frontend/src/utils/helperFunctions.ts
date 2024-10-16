import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartItem } from "../client";

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
const createRecipeCardImage = (
  image: string,
  width?: string,
  height?: string,
  classProps?: [
    {
      [key: string]: string;
    }
  ]
) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    height: height ? height : "300px",
    width: width ? width : "390px",
    marginBottom: "10px",
    props: classProps ? classProps : "",
  };
  return bgImage;
};
const getTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (acc, { quantity, price }) => acc + price * quantity,
    0
  );
};
// divide the nutrition of a product with in the description object
const divideDescriptionInfo = (
  descriptions: Array<string[]>,
  even: Array<string[]> = [],
  odd: Array<string[]> = []
): Array<string[][]> => {
  descriptions.forEach((desc, index) => {
    if (index % 2 !== 0) {
      odd.push(desc);
    } else {
      even.push(desc);
    }
  });
  return [odd, even];
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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

const addItemToCartList = (cartList: CartItem[], newItem: CartItem) => {
  const index = cartList.findIndex(
    (item) =>
      item.product._id === newItem.product._id && item.size === newItem.size
  );
  if (index === -1) {
    return [...cartList, newItem];
  } else {
    return [
      ...cartList.slice(0, index),
      {
        ...cartList[index],
        quantity: cartList[index].quantity + newItem.quantity,
      },
      ...cartList.slice(index + 1),
    ];
  }
};
export {
  addItemToCartList,
  createBanner,
  createRecipeCardImage,
  divideDescriptionInfo,
  ScrollToTop,
  removeItemFromCartList,
  getTotalPrice,
};
