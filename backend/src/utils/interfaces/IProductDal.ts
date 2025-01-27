export interface IProduct<T> {
  getProduct(id: string): Promise<T | null>;
  getAllProducts(
    page: number,
    limit: number,
    searchTerm?: string,
    category?: string,
    subCategory?: string
  ): Promise<T[] | unknown[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(id: string, postData: Partial<T>): Promise<T>;
  addProduct(t: T): Promise<T>;
}
