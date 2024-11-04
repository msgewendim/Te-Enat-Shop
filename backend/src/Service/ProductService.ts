import ProductDal from "../Dal/ProductDal";
import { Product } from "../../types/product.types";

export class ProductService {
  private productDataAccess: ProductDal;

  constructor(productDataAccess: ProductDal) {
    this.productDataAccess = productDataAccess;
  }

  async getProduct(productId: string): Promise<Product> {
    const result = await this.productDataAccess.getProduct(productId);
    if (!result) {
      throw new Error(`Product with id : ${productId} Not found`);
    }
    return result;
  }

  async addProduct(product: Product): Promise<void> {
    try {
      await this.productDataAccess.addProduct(product);
    } catch (error) {
      console.log(error);
      throw new Error("Can not add Product!");
    }
  }

  async getAllProducts(
    page: number,
    limit?: number,
    searchTerm?: string,
    category?: string
  ): Promise<Product[] | unknown> {
    try {
      if (!page) page = 1;
      if (!limit) limit = 9;
      return (await this.productDataAccess.getAllProducts(
        page,
        limit,
        searchTerm,
        category
      )) as Product[];
    } catch (error) {
      throw new Error("NO Products Found!");
    }
  }

  async updateProduct(productId: string, productData: Product): Promise<void> {
    try {
      await this.productDataAccess.updateProduct(productId, productData);
    } catch (error) {
      throw new Error(`Can not update Product! ${(error as Error).message}`);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productDataAccess.deleteProduct(productId);
    } catch (error) {
      throw new Error(`Can't delete Product ${(error as Error).message}`);
    }
  }
  async getTopProducts(
    page: number,
    limit: number
  ): Promise<Product[] | unknown> {
    try {
      const result = await this.productDataAccess.getRandomProducts(
        page,
        limit
      );
      console.log("productsService: products.len ", result.products.length);
      return result;
    } catch (error) {
      throw new Error(
        `Error getting random Products: ${(error as Error).message}`
      );
    }
  }
}
