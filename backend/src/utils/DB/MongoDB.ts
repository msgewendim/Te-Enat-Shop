import mongoose from "mongoose";
import recipes from "../../../recipes.json";
import RecipeModel from "../../models/RecipeSchema";

const connectToMongoDB = async (mongoUri: string) => {
  try {
    // connect to mongoDB
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
    // const Recipes = await RecipeModel.insertMany(recipes);
    // console.log("Recipes created successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongoDB;
