import { DataAccess } from "../../utils/interfaces/IProductDal";
import {Product} from "../../utils/types";

export class ProductDal implements DataAccess<Product> {
  getProduct(id: string): Promise<Product> {
   throw new Error("Method not implemented.");
  }
  getAllProducts(page? : number, pageSize? : number, filter? : string): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateProduct(id: string, postData: Partial<Product>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addProduct(product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default ProductDal;
