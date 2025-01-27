import { NextFunction, Response, Request } from "express";
import { ProductService } from "../Service/ProductService";
import { BadRequestError, ValidationError } from "../utils/customErrors";
import {
  validateUpdateProduct,
  validateAddProduct,
} from "../validators/products";
import { validateObjectId } from "../validators";
import mongoose from "mongoose";

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
        return res.status(200).json({
          success: true,
          message: "Product not found",
          data: null,
        });
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
      const {
        page = 1,
        limit = 9,
        filter,
        category,
        subCategory,
        exclude,
      } = req.query;
      if (exclude && !validateObjectId(exclude as string)) {
        return next(new BadRequestError("Invalid product ID format"));
      }
      const excludeById = mongoose.Types.ObjectId.isValid(exclude as string)
        ? (exclude as string)
        : undefined;
      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));
      const products = await this.productService.getAllProducts(
        parsedPage,
        parsedLimit,
        filter as string,
        category as string,
        subCategory as string,
        excludeById
      );
      if (products.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No products found",
          data: [],
        });
      }
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
      if (randomProducts.items.length === 0) {
        return res.status(400).json({
          success: true,
          message: "No random products found",
          data: [],
        });
      }
      res.status(200).json({
        success: true,
        message: "Random products fetched successfully",
        data: randomProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByName(req: Request, res: Response, next: NextFunction) {
    const { names } = req.body;
    try {
      const products = await this.productService.getProductsByName(
        Array.isArray(names) ? names : [names]
      );
      if (products.length === 0) {
        return res.status(400).json({
          success: true,
          message: "products by name not found",
          data: [],
        });
      }
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
}
