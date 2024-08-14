import express from "express";
import cors from "cors";
import activityLogger from "./src/utils/middleware/log";
import ProductRoute from "./src/Routes/ProductRoute";
import connectToMongoDB from "./src/utils/DB/MongoDB";
import dotenv from "dotenv";
dotenv.config();

const App = express();

const port = 3005;
App.use(express.json());
App.use(activityLogger);

App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

App.use("/api/products", ProductRoute);
// App.use("/api/users", UserRoute);
// App.use("/api/cart", CartRoute);
App.listen(port, () => {
  connectToMongoDB(process.env.MONGO_URI as string);
  console.log(`App is listening on port ${port}`);
});
