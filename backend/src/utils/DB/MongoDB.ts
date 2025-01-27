import mongoose from "mongoose";
import { InternalServerError } from "../customErrors";

const connectToMongoDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

const disconnectFromMongoDB = async () => {
  await mongoose.connection.close();
};
export { connectToMongoDB, disconnectFromMongoDB };
