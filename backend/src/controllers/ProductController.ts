import { Response, Request } from "express";
import { ProductService } from "../Service/ProductService";

export class ProductController {
  private productService: ProductService;

  constructor(ProductService: ProductService) {
    this.productService = ProductService;
  }

  async getProduct(req: Request, res: Response) {
    const productId = req.params._id;
    try {
      const product = await this.productService.getProduct(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const { page, filter, category, limit, subCategory } = req.query;
      const parsedPage = parseInt(page as string, 10);
      const parsedLimit = parseInt(limit as string, 10);
      const products = await this.productService.getAllProducts(
        parsedPage,
        parsedLimit,
        filter as string,
        category as string,
        subCategory as string
      );
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async addProduct(req: Request, res: Response) {
    const product = req.body;
    try {
      await this.productService.addProduct(product);
      res.status(201).json({ message: "Product Added to DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = req.params._id;
    try {
      await this.productService.deleteProduct(productId);
      res.status(200).json({ message: "Product Deleted from DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const productId = req.params._id;
    const productData = req.body;
    try {
      await this.productService.updateProduct(productId, productData);
      res.status(201).json({ message: "Product Updated!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
  async getTopProducts(req: Request, res: Response) {
    const { page = 1, limit = 3 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    try {
      const result = await this.productService.getTopProducts(
        parsedPage,
        parsedLimit
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
