import { IProduct } from "../utils/interfaces/IProductDal";
import { Product } from "../../types/product.types";
import productModel from "../models/ProductSchema";
import { QueryOptions } from "mongoose";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class ProductDal implements IProduct<Product> {
  async getProduct(id: string): Promise<Product | null> {
    try {
      const product = await productModel.findById(id);
      return product as Product;
    } catch (error) {
      throw error;
    }
  }
  async getAllProducts(
    page: number,
    limit: number,
    searchTerm?: string,
    category?: string,
    subCategory?: string,
    excludeById?: string
  ): Promise<Product[] | unknown[]> {
    try {
      const query: QueryOptions = {};

      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: "i" } },
          { shortDescription: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Category and SubCategory filters
      if (category || subCategory) {
        const filters: any[] = [];

        if (category) {
          filters.push({
            categories: {
              $elemMatch: {
                nameInEnglish: { $regex: category },
              },
            },
          });
          if (excludeById) {
            filters.push({
              _id: { $ne: excludeById },
            });
          }
        }

        if (subCategory) {
          filters.push({
            subCategories: {
              $elemMatch: {
                nameInEnglish: { $regex: subCategory },
              },
            },
          });
        }

        // If both filters are present, use $and to ensure both conditions are met
        if (filters.length > 1) {
          query.$and = filters;
        } else {
          // If only one filter is present, use it directly
          Object.assign(query, filters[0]);
        }
      }
      const products = await productModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return products as Product[];
    } catch (error) {
      throw error;
    }
  }

  async getRandomProducts(page: number, limit: number) {
    try {
      const totalProducts = await productModel.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;
      const products = await productModel.find().skip(skip).limit(limit);
      return {
        items: products as Product[],
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id: string): Promise<void> {
    try {
      const result = await productModel.deleteOne({
        _id: id,
      });
      if (!result.deletedCount) {
        throw new NotFoundError(`Product with id: ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(
    id: string,
    postData: Partial<Product>
  ): Promise<Product> {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, postData);
      if (!updatedProduct) {
        throw new NotFoundError(`Product with id: ${id} not found`);
      }
      return updatedProduct as Product;
    } catch (error) {
      throw error;
    }
  }
  async addProduct(product: Product): Promise<Product> {
    try {
      const newProduct = await productModel.insertMany(product);
      if (!newProduct) {
        throw new BadRequestError("Failed to add product");
      }
      return newProduct[0] as Product;
    } catch (error) {
      throw error;
    }
  }
  async getProductsByName(names: string[]): Promise<Product[]> {
    try {
      const nameRegexPatterns = names.map((name) => new RegExp(name, "i"));
      const products = await productModel.aggregate([
        {
          $match: {
            name: { $in: nameRegexPatterns },
          },
        },
        {
          $group: {
            _id: "$_id",
            doc: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$doc" },
        },
        {
          $sort: { name: 1 },
        },
      ]);

      return products as Product[];
    } catch (error) {
      throw error;
    }
  }
}

export default ProductDal;
