import { CartItem } from "./order.types";
import { Product } from "./product.types";
import { Recipe } from "./recipe.types";

interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  profilePicture?: string;
  savedRecipes: Recipe[];
  orderHistory: Order[];
  wishlist: Product[];
  cart: CartItem[];
  addresses: Address[];
  recipeReviews: string[];
  productReviews: string[];
  createdAt: Date;
  isAdmin?: boolean;
}

interface Order {
  id: string;
  userId: User['_id'];
  products: CartItem[];
  total: number;
  addItem(item: Product): void;
  removeItem(itemId: Product['_id']): void;
  updateItemQuantity(itemId: Product['_id'], quantity: number): void;
  clearCart(): void;
}
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export { User};