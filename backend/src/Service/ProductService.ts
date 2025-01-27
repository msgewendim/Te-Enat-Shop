import ProductDal from "../Dal/ProductDal";
import { Product } from "../../types/product.types";
import { BadRequestError } from "../utils/customErrors";
import { RandomItemsResponse } from "../../types";

export class ProductService {
  private productDataAccess: ProductDal;

  constructor(productDataAccess: ProductDal) {
    this.productDataAccess = productDataAccess;
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      return (await this.productDataAccess.getProduct(productId)) as Product;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product: Product): Promise<void> {
    try {
      await this.productDataAccess.addProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(
    page: number,
    limit?: number,
    searchTerm?: string,
    category?: string,
    subCategory?: string,
    excludeById?: string
  ): Promise<Product[]> {
    try {
      if (!page) page = 1;
      if (!limit) limit = 9;
      return (await this.productDataAccess.getAllProducts(
        page,
        limit,
        searchTerm,
        category,
        subCategory,
        excludeById
      )) as Product[];
    } catch (error: any) {
      throw error;
    }
  }

  async updateProduct(productId: string, productData: Product): Promise<void> {
    try {
      await this.productDataAccess.updateProduct(productId, productData);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productDataAccess.deleteProduct(productId);
    } catch (error) {
      throw error;
    }
  }
  async getRandomProducts(
    page: number,
    limit: number
  ): Promise<RandomItemsResponse> {
    try {
      return await this.productDataAccess.getRandomProducts(page, limit);
    } catch (error) {
      throw error;
    }
  }

  async getProductsByName(names: string[]): Promise<Product[]> {
    try {
      return await this.productDataAccess.getProductsByName(names);
    } catch (error: any) {
      throw error;
    }
  }
}
