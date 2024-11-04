import { useAddProductMutation, useUpdateProductMutation } from '../hooks/useProductsData';
import { Product, Recipe } from '../client';
import { useAppContext } from './useAppContext';
import { useAddRecipeMutation, useUpdateRecipeMutation } from './useRecipesData';

function useAdminDashboard() {
  const { adminActiveSection, setAdminActiveSection, productToEdit, setProductToEdit, recipeToEdit, setRecipeToEdit } = useAppContext();
  const { mutate: updateProduct } = useUpdateProductMutation();
  const { mutate: addProduct, } = useAddProductMutation();
  const { mutate: addRecipe, } = useAddRecipeMutation();
  const { mutate: updateRecipe } = useUpdateRecipeMutation();

  const handleSubmit = (data: Partial<Product> | Partial<Recipe>) => {
    const isProduct = adminActiveSection.includes('product');

    if (adminActiveSection.includes('edit')) {
      // Update existing item
      if (isProduct) {
        updateProduct({
          productId: productToEdit?._id || "",
          productData: data as Partial<Product>,
        });
      } else {
        updateRecipe({
          recipeId: recipeToEdit?._id || "",
          recipeData: data as Partial<Recipe>,
        });
      }
    } else {
      // Add new item
      if (isProduct) {
        addProduct(data as Partial<Product>);
      } else {
        addRecipe(data as Partial<Recipe>);
      }
    }

    // Reset state and refetch
    if (isProduct) {
      setProductToEdit(undefined);
      setAdminActiveSection('products');
    } else {
      setRecipeToEdit(undefined);
      setAdminActiveSection('recipes');
    }
  };

  return { handleSubmit, productToEdit, adminActiveSection, setAdminActiveSection, recipeToEdit };
}

export default useAdminDashboard;