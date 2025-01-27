export interface IRecipe<T> {
  getRecipe(id: string): Promise<T | null>;
  getAllRecipes(page: number, limit: number): Promise<T[] | unknown[]>;
  deleteRecipe(id: string): Promise<void>;
  updateRecipe(id: string, recipeData: Partial<T>): Promise<T>;
  addRecipe(t: T): Promise<T>;
}
