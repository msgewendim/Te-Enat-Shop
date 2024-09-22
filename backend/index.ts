import express from "express";
import cors from "cors";
import OrderRoute from "./src/Routes/OrderRoute";
import ProductRoute from "./src/Routes/ProductRoute";
import connectToMongoDB from "./src/utils/DB/MongoDB";
import activityLogger from "./src/utils/middleware/log";
import swagger from "./swagger"
import dotenv from "dotenv";
dotenv.config();

const server = express();
const port = 3005;
server.use(express.json());
server.use(activityLogger);

server.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

server.use("/api/products", ProductRoute);
server.use("/api/orders", OrderRoute);

server.use(swagger);
server.listen(port, () => {
  connectToMongoDB(process.env.MONGO_ATLAS_URI as string);
  console.log(`server is listening on port ${port}`);
  // console.log(`Swagger UI is available at http://localhost:${port}/api-docs`)
});
