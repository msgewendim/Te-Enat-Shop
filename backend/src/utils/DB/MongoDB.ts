import mongoose from "mongoose";
import recipes from "../../../recipes.json";
import { InternalServerError } from "../customErrors";
import RecipeModel from "../../models/RecipeSchema";

const connectToMongoDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
    // await RecipeModel.insertMany(recipes);
    // console.log("recipes inserted");
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

const disconnectFromMongoDB = async () => {
  await mongoose.connection.close();
};
export { connectToMongoDB, disconnectFromMongoDB };
