import userModel, { User } from "../models/User";

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
type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};
export { addUserWithAuth, addToCart, clearCart };