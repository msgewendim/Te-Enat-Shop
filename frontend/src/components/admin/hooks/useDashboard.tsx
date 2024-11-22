import { useAddProductMutation, useUpdateProductMutation } from '../../../hooks/product/useProductsData';
import { Package, Product, Recipe } from '../../../client';
import { useAppContext } from '../../../hooks/app/useAppContext';
import { useAddRecipeMutation, useUpdateRecipeMutation } from '../../../hooks/recipe/useRecipesData';
import { useAddPackageMutation, useUpdatePackageMutation } from '../../../hooks/package/usePackagesData';

function useAdminDashboard() {
  const { adminActiveSection, setAdminActiveSection, productToEdit, setProductToEdit, recipeToEdit, setRecipeToEdit, packageToEdit, setPackageToEdit } = useAppContext();
  const { mutate: updateProduct } = useUpdateProductMutation();
  const { mutate: addProduct, } = useAddProductMutation();
  const { mutate: addRecipe, } = useAddRecipeMutation();
  const { mutate: updateRecipe } = useUpdateRecipeMutation();
  const { mutate: updatePackage } = useUpdatePackageMutation();
  const { mutate: addPackage } = useAddPackageMutation();

  const handleSubmit = (data: Partial<Product> | Partial<Recipe> | Partial<Package>) => {
    const isProduct = adminActiveSection.includes('product');
    const isPackage = adminActiveSection.includes('package');
    if (adminActiveSection.includes('edit')) {
      // Update existing item
      if (isPackage) {
        updatePackage({
          itemId: packageToEdit?._id || "",
          itemData: data as Partial<Package>,
        });
      } else if (isProduct) {
        updateProduct({
          itemId: productToEdit?._id || "",
          itemData: data as Partial<Product>,
        });
      } else {
        updateRecipe({
          itemId: recipeToEdit?._id || "",
          itemData: data as Partial<Recipe>,
        });
      }
    } else {
      // Add new item
      if (isProduct) {
        addProduct(data as Partial<Product>);
      } else if (isPackage) {
        addPackage(data as Partial<Package>);
      } else {
        addRecipe(data as Partial<Recipe>);
      }
    }

    // Reset state and refetch
    if (isProduct) {
      setProductToEdit(undefined);
      setAdminActiveSection('products');
    } else if (isPackage) {
      setPackageToEdit(undefined);
      setAdminActiveSection('packages');
    } else {
      setRecipeToEdit(undefined);
      setAdminActiveSection('recipes');
    }
  };

  return { handleSubmit, productToEdit, adminActiveSection, setAdminActiveSection, recipeToEdit, packageToEdit };
}

export default useAdminDashboard;