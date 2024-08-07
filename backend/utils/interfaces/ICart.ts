import mongoose from "mongoose";

export interface ICart<T> {
  // user : string;
  // items: T[];
  // total: number;
  addItem(item: T): void;
  removeItem(itemId: mongoose.Types.ObjectId): void;
  updateItemQuantity(itemId: mongoose.Types.ObjectId, flag: string): void;
  clearCart(): void;
}
