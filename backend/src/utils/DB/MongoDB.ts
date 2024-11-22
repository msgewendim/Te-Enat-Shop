import mongoose from "mongoose";

const connectToMongoDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongoDB;
