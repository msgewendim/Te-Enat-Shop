export interface IUser<T> {
  getUserById(id: string): Promise<T | null>
  createUser(userData : T): Promise<T>
  updateUser(id : string, userData: Partial<T>): Promise<T>
}