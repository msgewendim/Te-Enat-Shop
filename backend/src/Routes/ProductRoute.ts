import { ProductService } from "../Service/ProductService";
import express, { Request, Response, NextFunction } from "express";
import ProductDal from "../Dal/ProductDal";
import { ProductController } from "../controllers/ProductController";
import jwtCheck from "../utils/middleware/auth.config";

const router = express.Router();
const productController = new ProductController(
  new ProductService(new ProductDal())
);

router.get(
  "/",
  async (req: Request, res: Response) =>
    await productController.getAllProducts(req, res)
);
router.get(
  "/top-products",
  async (req: Request, res: Response) =>
    await productController.getTopProducts(req, res)
);
router.get(
  "/:_id",
  async (req: Request, res: Response) =>
    await productController.getProduct(req, res)
);
router.post(
  "/",

  async (req: Request, res: Response) =>
    await productController.addProduct(req, res)
);
router.delete(
  "/:_id",
  async (req: Request, res: Response) =>
    await productController.deleteProduct(req, res)
);
router.put(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response) =>
    await productController.updateProduct(req, res)
);

export default router;
