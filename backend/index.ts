import express from "express";
import cors from "cors";
import OrderRoute from "./src/Routes/OrderRoute";
import ProductRoute from "./src/Routes/ProductRoute";
import connectToMongoDB from "./src/utils/DB/MongoDB";
import activityLogger from "./src/utils/middleware/log";
import swagger from "./swagger"
import dotenv from "dotenv";
dotenv.config();

const App = express();
const APP_REACT_URL = process.env.APP_REACT_URL || "http://localhost:5173"
const port = 3005;
App.use(express.json());
App.use(activityLogger);

App.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

App.use("/api/products", ProductRoute);
App.use("/api/orders", OrderRoute);

App.use(swagger);
App.listen(port, () => {
  connectToMongoDB(process.env.MONGO_ATLAS_URI as string);
  console.log(`App is listening on port ${port}`);
  // console.log(`Swagger UI is available at http://localhost:${port}/api-docs`)
});
