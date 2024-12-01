import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import { ProductService } from "../Service/ProductService";
import {
  BadRequestError,
  ValidationError,
  NotFoundError,
} from "../utils/customErrors";
import {
  validateUpdateProduct,
  validateAddProduct,
} from "../validators/products";
import { validateObjectId } from "../validators";

export class ProductController {
  private productService: ProductService;

  constructor(ProductService: ProductService) {
    this.productService = ProductService;
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params._id;
    if (!validateObjectId(productId)) {
      return next(new BadRequestError("Invalid product ID format"));
    }
    try {
      const productData = await this.productService.getProduct(productId);
      if (!productData) {
        return next(new NotFoundError("Product not found"));
      }
      res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: productData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, filter, category, limit = 9, subCategory } = req.query;
      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));
      const products = await this.productService.getAllProducts(
        parsedPage,
        parsedLimit,
        filter as string,
        category as string,
        subCategory as string
      );
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    const product = req.body;
    const { error } = validateAddProduct(product);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      await this.productService.addProduct(product);
      res.status(201).json({
        success: true,
        message: "Product Added to DB!",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params._id;
    if (!validateObjectId(productId)) {
      return next(new BadRequestError("Invalid product ID format"));
    }
    try {
      await this.productService.deleteProduct(productId);
      res.status(200).json({
        success: true,
        message: "Product Deleted from DB!",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params._id;
    const productData = req.body;
    if (!validateObjectId(productId)) {
      return next(new BadRequestError("Invalid product ID format"));
    }
    const { error } = validateUpdateProduct(productData);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      await this.productService.updateProduct(productId, productData);
      res.status(201).json({
        success: true,
        message: "Product Updated!",
      });
    } catch (error) {
      next(error);
    }
  }
  async getRandomProducts(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 3 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    try {
      const randomProducts = await this.productService.getRandomProducts(
        parsedPage,
        parsedLimit
      );
      res.status(200).json({
        success: true,
        message: "Random products fetched successfully",
        data: randomProducts,
      });
    } catch (error) {
      next(error);
    }
  }
}
