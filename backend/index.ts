import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import OrderRoute from "./src/Routes/OrderRoute";
import UserRoute from "./src/Routes/UserRoute";
import RecipeRoute from "./src/Routes/RecipeRoutes";
import ProductRoute from "./src/Routes/ProductRoute";
import PackageRoute from "./src/Routes/PackageRoute";
import { connectToMongoDB } from "./src/utils/DB/MongoDB";
import EventsMiddleware from "./src/utils/middleware/sse.events";
// import swagger from "./swagger";
import { FRONTEND_URL_DEVELOPMENT, FRONTEND_URL_ON_RENDER, FRONTEND_URL_PRODUCTION, MONGO_ATLAS_URI } from "./src/utils/config/env.config";
import errorHandler from "./src/utils/middleware/errorHandler";
import activityLogger from "./src/utils/middleware/activityLogger";

export const server = express();
const port = process.env.PORT || 3005;
const corsAllowedOrigins = [
  FRONTEND_URL_DEVELOPMENT,
  FRONTEND_URL_PRODUCTION,
  FRONTEND_URL_ON_RENDER,
]
// parse incoming request bodies as json and urlencoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// middleware to log all incoming requests and responses
server.use(activityLogger);
server.use(
  cors({
    credentials: true,
    origin: corsAllowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

server.use("/api/products", ProductRoute);
server.use("/api/packages", PackageRoute);
server.use("/api/orders", OrderRoute);
server.use("/api/recipes", RecipeRoute);
server.use("/api/users", UserRoute);
// handle SSE (Server-Sent Events) requests for real-time updates - payment notifications
server.use("/api/events", EventsMiddleware);

// handle swagger documentation
// server.use(swagger);

// handle static files for the frontend
const FRONTEND_BUILD_PATH = path.join(__dirname, "..", "frontend", "dist");

// Check if frontend build directory exists before serving static files
if (fs.existsSync(FRONTEND_BUILD_PATH)) {
  console.log(`Serving frontend from: ${FRONTEND_BUILD_PATH}`);
  server.use(express.static(FRONTEND_BUILD_PATH));
  
  // Serve index.html for all non-API routes (SPA support)
  server.get("*", (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    
    res.sendFile(path.join(FRONTEND_BUILD_PATH, "index.html"), (err) => {
      if (err) {
        console.error("Error loading client application:", err);
        res.status(500).send("Error loading client application");
      }
    });
  });
} else {
  console.log(`Frontend build directory not found at: ${FRONTEND_BUILD_PATH}`);
  
  // Handle non-API routes when frontend is not available
  server.get("/", (req, res) => {
    res.status(200).send("Te-Enat API Server is running. Frontend is not available.");
  });
  
  server.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.status(404).send("Frontend not available. Please use the API endpoints.");
  });
}

// handle errors
server.use(errorHandler);

server.listen(port, () => {
  connectToMongoDB(MONGO_ATLAS_URI);
  console.log(`server is listening on port ${port}`);
});
