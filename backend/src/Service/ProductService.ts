import ProductDal from "../Dal/ProductDal";
import { Product } from "../../types/product.types";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class ProductService {
  private productDataAccess: ProductDal;

  constructor(productDataAccess: ProductDal) {
    this.productDataAccess = productDataAccess;
  }

  async getProduct(productId: string): Promise<Product> {
    const result = await this.productDataAccess.getProduct(productId);
    if (!result) {
      throw new NotFoundError(`Product with id: ${productId} not found`);
    }
    return result;
  }

  async addProduct(product: Product): Promise<void> {
    try {
      await this.productDataAccess.addProduct(product);
    } catch (error) {
      throw new BadRequestError("Failed to add product");
    }
  }

  async getAllProducts(
    page: number,
    limit?: number,
    searchTerm?: string,
    category?: string,
    subCategory?: string
  ): Promise<Product[]> {
    try {
      if (!page) page = 1;
      if (!limit) limit = 9;
      return (await this.productDataAccess.getAllProducts(
        page,
        limit,
        searchTerm,
        category,
        subCategory
      )) as Product[];
    } catch (error: any) {
      throw new NotFoundError(`No Products Found! ${error.message}`);
    }
  }

  async updateProduct(productId: string, productData: Product): Promise<void> {
    try {
      await this.productDataAccess.updateProduct(productId, productData);
    } catch (error) {
      throw new BadRequestError(
        `Can not update Product! ${(error as Error).message}`
      );
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productDataAccess.deleteProduct(productId);
    } catch (error) {
      throw new BadRequestError(
        `Can't delete Product ${(error as Error).message}`
      );
    }
  }
  async getRandomProducts(
    page: number,
    limit: number
  ): Promise<Product[] | unknown> {
    try {
      const result = await this.productDataAccess.getRandomProducts(
        page,
        limit
      );
      console.log("productsService: products.len ", result.items.length);
      return result;
    } catch (error) {
      throw new NotFoundError(
        `Error getting random Products: ${(error as Error).message}`
      );
    }
  }
}
