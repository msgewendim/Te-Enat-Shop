import mongoose from "mongoose"

type Product = {
  _id : mongoose.Types.ObjectId,
  name : string,
  price : number,
  quantity: number
  countInStock : number,
  description : string,
  imageUrl : string
  category : string,
  rating : number,
  numReviews : number,
}

type User = {
  _id : mongoose.Types.ObjectId,
  username : string,
  email : string,
  password : string,
  image : string,
  isAdmin? : boolean
}

type Cart = {
  _id : mongoose.Types.ObjectId,
  user : User['_id'],
  products : Product['_id'][],
  total: number,
  addItem(item: Product): void;
  removeItem(itemId: Product['_id']): void;
  updateItemQuantity(itemId: Product['_id'], quantity: number): void;
  clearCart(): void;
}

export { Product, User, Cart};