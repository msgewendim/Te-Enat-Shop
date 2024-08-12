import { IProduct } from "../utils/interfaces/IProductDal";
import {Product} from "../../../types/product.types"
import productModel from "../models/Product";

export class ProductDal implements IProduct<Product> {
  async getProduct(id: string) : Promise<Product | null> {
    try {
      const product = await productModel.findById(id) as Product;
      return product 
    } catch (error) {
      throw error
    }
  }
  async getAllProducts(pageSize: number = 10, page : number = 0, filter? : string): Promise<Product[]> {
    try {
      const products = await productModel.find({}, {}, {limit: pageSize, skip: page * pageSize}) as Product[];
      return products
    } catch (error) {
      throw error
    }
  }
  async deleteProduct(id: string): Promise<void> {
    try {
      await productModel.findByIdAndDelete(id);
    } catch (error) {
      throw error
    }
  }
  async updateProduct(id: string, postData: Partial<Product>): Promise<void> {
    try {
      await productModel.findByIdAndUpdate(id, postData)
    } catch (error) {
      throw error
    }
  }
  async addProduct(product: Product): Promise<void> {
    try {
      const newProduct = await productModel.create(product);
      console.log(newProduct);
    } catch (error) {
      throw error
    }
  }
}

export default ProductDal;
