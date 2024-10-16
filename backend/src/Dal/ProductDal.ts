import { IProduct } from "../utils/interfaces/IProductDal";
import { Product } from "../../types/product.types";
import productModel from "../models/Product";
import { QueryOptions } from "mongoose";

export class ProductDal implements IProduct<Product> {
  async getProduct(id: string): Promise<Product | null> {
    try {
      const product = (await productModel.findById(id)) as Product;
      return product;
    } catch (error) {
      throw error;
    }
  }
  async getAllProducts(
    page: number,
    limit: number,
    searchTerm?: string,
    category?: string
  ): Promise<Product[] | unknown[]> {
    try {
      const query: QueryOptions = {};
      // Search both `name` and `shortDescription` with the same input
      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: "i" } },
          { shortDescription: { $regex: searchTerm, $options: "i" } },
        ];
      }
      // Add category filter if provided
      if (category) {
        query.categories = { $regex: category };
      }
      const products = await productModel
        .find(query)
        .skip((page - 1) * limit) // Skip items based on the page number
        .limit(limit) // Limit the number of items returned
        .exec();
      return products;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id: string): Promise<void> {
    try {
      await productModel.deleteOne({
        _id: id,
      });
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(
    id: string,
    postData: Partial<Product>
  ): Promise<Product> {
    try {
      const updatedProduct = (await productModel.findByIdAndUpdate(
        id,
        postData
      )) as Product;
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
  async addProduct(product: Product): Promise<Product> {
    try {
      const newProduct = (await productModel.insertMany(product)) as Product[];
      console.log("Product created successfully", newProduct);
      return newProduct[0];
    } catch (error) {
      throw error;
    }
  }
}

export default ProductDal;
