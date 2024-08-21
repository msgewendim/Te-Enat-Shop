import { ProductService } from "../Service/ProductService";
import express, { Request, Response } from "express";
import ProductDal from "../Dal/ProductDal";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();
const productController = new ProductController(
  new ProductService(new ProductDal())
);

router.get("/:_id", async (req: Request, res: Response) =>
  await productController.getProduct(req, res)
);
router.post("/", async (req: Request, res: Response) =>
  await productController.addProduct(req, res)
);
router.delete("/:_id", async (req: Request, res: Response) =>
  await productController.deleteProduct(req, res)
);
router.put("/:_id", async (req: Request, res: Response) =>
  await productController.updateProduct(req, res)
);

export default router;
