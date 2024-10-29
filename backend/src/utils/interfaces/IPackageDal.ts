export interface IPackage<T> {
  getPackage(id: string): Promise<T | null>;
  getAllPackages(): Promise<T[] | unknown[]>;
  deletePackage(id: string): Promise<void>;
  updatePackage(id: string, postData: Partial<T>): Promise<T>;
  addPackage(t: T): Promise<T>;
}
