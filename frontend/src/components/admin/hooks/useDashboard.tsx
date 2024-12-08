import { Package, Product, Recipe } from '../../../client';
import { useAppContext } from '../../../hooks/app/useAppContext';
import useGenericData from '../../../hooks/app/useGenericData';

function useAdminDashboard() {
  const { adminActiveSection, setAdminActiveSection, productToEdit, setProductToEdit, recipeToEdit, setRecipeToEdit, packageToEdit, setPackageToEdit } = useAppContext();

  // Generic Data Hooks  
  const { useAddItemMutation: addProductMutation, useUpdateItemMutation: updateProductMutation } = useGenericData<Product>(`/products`);

  const { useAddItemMutation: addRecipeMutation, useUpdateItemMutation: updateRecipeMutation } = useGenericData<Recipe>(`/recipes`);

  const { useAddItemMutation: addPackageMutation, useUpdateItemMutation: updatePackageMutation } = useGenericData<Package>(`/packages`);

  // Mutations
  const { mutate: addProduct, isError: isProductAddError, isSuccess: isProductAddSuccess, isPending: isProductAddPending, error : productAddError } = addProductMutation();
  const { mutate: updateProduct, isError: isProductUpdateError, isSuccess: isProductUpdateSuccess, isPending: isProductUpdatePending, error : productUpdateError } = updateProductMutation();
  const { mutate: addRecipe, isError: isRecipeAddError, isSuccess: isRecipeAddSuccess, isPending: isRecipeAddPending, error : recipeAddError } = addRecipeMutation();
  const { mutate: updateRecipe, isError: isRecipeUpdateError, isSuccess: isRecipeUpdateSuccess, isPending: isRecipeUpdatePending, error : recipeUpdateError } = updateRecipeMutation();
  const { mutate: addPackage, isError: isPackageAddError, isSuccess: isPackageAddSuccess, isPending: isPackageAddPending, error : packageAddError } = addPackageMutation();
  const { mutate: updatePackage, isError: isPackageUpdateError, isSuccess: isPackageUpdateSuccess, isPending: isPackageUpdatePending, error : packageUpdateError } = updatePackageMutation();

  const handleSubmit = (data: Partial<Product> | Partial<Recipe> | Partial<Package>) => {
    const isProduct = adminActiveSection.includes('product');
    const isPackage = adminActiveSection.includes('package');
    if (adminActiveSection.includes('edit')) {
      // Update existing item
      if (isPackage) {
        updatePackage({ itemId: packageToEdit?._id || "", itemData: data as Partial<Package> });
      } else if (isProduct) {
        updateProduct({ itemId: productToEdit?._id || "", itemData: data as Partial<Product> });
      } else {
        updateRecipe({ itemId: recipeToEdit?._id || "", itemData: data as Partial<Recipe> });
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

  return { 
    handleSubmit, 
    productToEdit, 
    setProductToEdit, 
    setAdminActiveSection, 
    adminActiveSection, 
    recipeToEdit, packageToEdit, 
    productUpdateError, isProductUpdateSuccess, isProductUpdatePending, productAddError, isProductAddSuccess, isProductAddPending, 
    recipeUpdateError, isRecipeUpdateSuccess, isRecipeUpdatePending, recipeAddError, isRecipeAddSuccess, isRecipeAddPending, 
    packageUpdateError, isPackageUpdateSuccess, isPackageUpdatePending, packageAddError, isPackageAddSuccess, isPackageAddPending,
    isPackageAddError, isPackageUpdateError, isProductAddError, isProductUpdateError, isRecipeAddError, isRecipeUpdateError
  };
}

export default useAdminDashboard;