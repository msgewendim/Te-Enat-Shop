import { ICart } from "../../utils/interfaces/ICart";
import {Product, User} from "../../utils/types";

export class Order implements ICart<Product> {
  private _id: string;
  private user: User['_id'];
  private items: Product[];
  private total: number;

  constructor(id: string, user: User['_id'], items: Product[], total: number) {
    this._id = id;
    this.user = user;
    this.items = items;
    this.total = total;
  }
  addItem(item: Product): void {
    this.items.push(item);
  }
  removeItem(itemId: Product['_id']): void {
    this.items = this.items.filter(item => item._id !== itemId);
  }
  updateItemQuantity(itemId: Product['_id'], flag : string): void {
    this.items.forEach(item => {
      if (item._id === itemId) {
        if (item.quantity === 0) {
            this.removeItem(itemId);
            return;
          }
        if (flag === '-'){
          item.quantity -= 1;
          return
        }else {
          item.quantity += 1;
          return
        }
      }
    });
  }
  clearCart(): void {
    this.items = []
  }
  
}

