import ProductDal from "../Dal/ProductDal";
import { Product } from "../../types/product.types";

export class ProductService {
  private ProductDataAccess: ProductDal;

  constructor(ProductDataAccess: ProductDal) {
    this.ProductDataAccess = ProductDataAccess;
  }

  async getProduct(productId: string): Promise<Product> {
    const result = await this.ProductDataAccess.getProduct(productId);
    if (!result) {
      throw new Error(`Product with id : ${productId} Not found`);
    }
    return result;
  }

  async addProduct(product: Product): Promise<void> {
    try {
      await this.ProductDataAccess.addProduct(product);
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
      return await this.ProductDataAccess.getAllProducts(
        page,
        limit,
        searchTerm,
        category
      );
    } catch (error) {
      throw new Error("NO Products Found!");
    }
  }

  async updateProduct(productId: string, productData: Product): Promise<void> {
    try {
      await this.ProductDataAccess.updateProduct(productId, productData);
    } catch (error) {
      throw new Error(`Can not update Product! ${(error as Error).message}`);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.ProductDataAccess.deleteProduct(productId);
    } catch (error) {
      throw new Error(`Can't delete Product ${(error as Error).message}`);
    }
  }
}
