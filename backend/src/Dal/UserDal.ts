import { NewsLetterData } from "../../types";
import userModel, {
  designProductModel,
  earlyAdapterModel,
  newsletterModel,
  tobiaWaitListModel,
  User,
} from "../models/UserSchema";

const addUserWithAuth = async (userInfo: Partial<User>) => {
  try {
    // const { mobile, address } = clientDetails;
    const newUserInfo = await userModel.create({
      ...userInfo,
      address: {
        street: "street 1",
        city: "city 1",
        zip: "12345",
      },
      role: "user",
      mobile: "054828290",
    });
    return newUserInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add user with authentication");
  }
};
const addToCart = async (userId: string, cartItem: CartItem) => {
  try {
    const { productId, quantity, size } = cartItem;
    const updatedCart = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: {
            $push: {
              productId,
              quantity,
              size,
            },
          },
        },
      },
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to cart");
  }
};

const clearCart = async (userId: string) => {
  try {
    const updatedCart = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: [],
        },
      },
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to clear cart");
  }
};

const addToNewsletter = async (data: NewsLetterData) => {
  try {
    const user = await newsletterModel.insertMany(data);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to newsletter");
  }
};
export const addToTobiaWaitList = async (data: NewsLetterData) => {
  try {
    const user = await tobiaWaitListModel.insertMany(data);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to Tobia waitlist");
  }
};
const addToEarlyAdapter = async (data: NewsLetterData) => {
  try {
    const user = await earlyAdapterModel.insertMany(data);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to newsletter");
  }
};
const addToDesignProduct = async (data: NewsLetterData) => {
  try {
    const user = await designProductModel.insertMany(data);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to newsletter");
  }
};
type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};
export {
  addUserWithAuth,
  addToCart,
  clearCart,
  addToDesignProduct,
  addToEarlyAdapter,
  addToNewsletter,
};
