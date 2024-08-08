import { Product } from "./product.types";
import { User } from "./user.types";

interface CartItem {
  productId: Product['_id'];
  quantity: number;
}

interface Cart {
  userId: User['_id'];
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalPrice: number;
}

export { Cart, CartItem };