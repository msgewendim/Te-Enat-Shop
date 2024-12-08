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
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.getAllProducts(req, res, next)
);
router.get(
  "/random",
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.getRandomProducts(req, res, next)
);

router.post(
  "/names",
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.getProductsByName(req, res, next)
);

// router.get(
//   "/tobia",
//   async (req: Request, res: Response, next: NextFunction) =>
//     await productController.getTobiaProducts(req, res, next)
// );
// router.post(
//   "/tobia",
//   async (req: Request, res: Response, next: NextFunction) =>
//     await productController.addTobiaProducts(req, res, next)
// );

router.get(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.getProduct(req, res, next)
);
router.post(
  "/",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.addProduct(req, res, next)
);
router.delete(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.deleteProduct(req, res, next)
);
router.put(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await productController.updateProduct(req, res, next)
);

export default router;
