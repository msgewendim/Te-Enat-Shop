export interface IProduct<T> {
  getProduct(id: string): Promise<T | null>;
  getAllProducts(): Promise<T[] | null>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(id: string, postData: Partial<T>): Promise<void>;
  addProduct(t: T): Promise<void>;
}
