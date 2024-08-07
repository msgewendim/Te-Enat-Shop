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
      // receive this from the URL if specify
      const { page = 1, pageSize = 5, filter } = req.query;
      // all data in the query is as string so needed to ParseIt
      const parsedPage = parseInt(page as string, 10);
      // function takes string , counting BASE &  returns Integer
      const parsedPageSize = parseInt(pageSize as string, 10);
      const products = await this.productService.getAllProducts(
        parsedPage,
        parsedPageSize,
        filter as string
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
