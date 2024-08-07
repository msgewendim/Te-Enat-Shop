export interface DataAccess<T> {
  getProduct(id: string): Promise<T>;
  getAllProducts(): Promise<T[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(id: string, postData: Partial<T>): Promise<void>;
  addProduct(t: T): Promise<void>;
}
