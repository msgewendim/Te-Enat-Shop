import express  from "express";
import ProductRoute from "./src/Routes/ProductRoute";
import connectToMongoDB from "./utils/DB/MongoDB";

const server = express();

const port = 3005;
server.use(express.json())

server.use("/api/products", ProductRoute);
// server.use("/api/users", UserRoute);
// server.use("/api/cart", CartRoute);
server.use(connectToMongoDB)
server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
