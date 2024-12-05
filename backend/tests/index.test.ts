import express from "express";
import cors from "cors";
import http from "http";
import { FRONTEND_URL, MONGO_ATLAS_URI } from "../src/utils/config/env.config";
import ProductRoute from "../src/Routes/ProductRoute";
import PackageRoute from "../src/Routes/PackageRoute";
import OrderRoute from "../src/Routes/OrderRoute";
import UserRoute from "../src/Routes/UserRoute";
import RecipeRoute from "../src/Routes/RecipeRoutes";
import errorHandler from "../src/utils/middleware/errorHandler";
import {
  connectToMongoDB,
  disconnectFromMongoDB,
} from "../src/utils/DB/MongoDB";

export const testServer = express();

testServer.use(express.json());
testServer.use(express.urlencoded({ extended: true }));
testServer.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

testServer.use("/api/products", ProductRoute);
testServer.use("/api/packages", PackageRoute);
testServer.use("/api/orders", OrderRoute);
testServer.use("/api/recipes", RecipeRoute);
testServer.use("/api/users", UserRoute);

testServer.use(errorHandler);

let server: http.Server | undefined;
beforeAll((done) => {
  server = testServer.listen(8080, async () => {
    await connectToMongoDB(MONGO_ATLAS_URI);
    console.log("test server is listening on port 8080");
    done();
  });
});

describe("Server", () => {
  it("should start the server", () => {
    expect(testServer).toBeDefined();
  });
});

afterAll(async () => {
  await disconnectFromMongoDB();
  server?.close();
});
