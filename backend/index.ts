import express from "express";
import cors from "cors";
import OrderRoute from "./src/Routes/OrderRoute";
import UserRoute from "./src/Routes/UserRoute";
import ProductRoute from "./src/Routes/ProductRoute";
import connectToMongoDB from "./src/utils/DB/MongoDB";
import activityLogger from "./src/utils/middleware/log";
import EventsMiddleware from "./src/utils/middleware/sse.events";
import swagger from "./swagger";
import { MONGO_ATLAS_URI } from "./src/utils/config/env.config";

const server = express();
const port = 3005;

// parse incoming request bodies as json and urlencoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// middleware to log all incoming requests and responses
server.use(activityLogger);
server.use(
  cors({
    credentials: true,
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

server.use("/api/products", ProductRoute);
server.use("/api/orders", OrderRoute);
server.use("/api/users", UserRoute);

// handle SSE (Server-Sent Events) requests for real-time updates - payment notifications
server.use("/api/events", EventsMiddleware);

server.use(swagger);
server.listen(port, () => {
  connectToMongoDB(MONGO_ATLAS_URI);
  console.log(`server is listening on port ${port}`);
  // console.log(`Swagger UI is available at http://localhost:${port}/api-docs`)
});
