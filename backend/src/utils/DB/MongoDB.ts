import mongoose from "mongoose";
import products from "../../../products.json";
import ProductModel from "../../models/ProductSchema";
const connectToMongoDB = async (mongoUri: string) => {
  try {
    // connect to mongoDB
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
    // await ProductModel.insertMany(products);
    // console.log("Products added successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongoDB;
