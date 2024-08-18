import { Product } from "../../../types/product.types";
import { ProductService } from "../Service/ProductService";
import { Response, Request } from "express";

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
      const { page, filter, category } = req.query;
      const parsedPage = parseInt(page as string, 10);
      const products = await this.productService.getAllProducts(
        parsedPage,
        filter as string,
        category as string
      );
      // console.log(products[0]);
      res.status(200).json(products as Product[]);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async addProduct(req: Request, res: Response) {
    const product = req.body;
    // console.log(product, "add product controller");
    try {
      await this.productService.addProduct(product);
      res.status(201).send("Product Added to DB!");
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = req.params._id;
    try {
      await this.productService.deleteProduct(productId);
      res.status(200).send("Product Deleted from DB!");
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const productId = req.params._id;
    const productData = req.body;
    try {
      await this.productService.updateProduct(productId, productData);
      res.status(201).send("Product Updated!");
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
