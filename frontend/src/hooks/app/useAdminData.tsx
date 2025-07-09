import { useAppContext } from "./useAppContext";
import useGenericDashboard from './useGenericDashboard';
import useGenericData from "./useGenericData";
import useShop from '../product/useShop';
import usePackages from "../package/usePackages";
import useRecipes from "../recipe/useRecipes";
import { TableData } from "../../providers/interface/general.props";
import { RecipeTableData } from "../../providers/interface/admin.props";
import { Product, Package, Recipe } from "../../client/types.gen";

type DataType = 'products' | 'packages' | 'recipes';

// interface AdminDataConfig<T> {
//   dataType: DataType;
//   displayFields: Record<string, string>;
//   formatTableData: (items: T[]) => TableData[] | RecipeTableData[];
//   setItemToEdit: (item: T) => void;
//   endpoint: string;
// }

// Predefined configurations for each data type
const adminConfigs = {
  products: {
    endpoint: "/products",
    displayFields: {
      name: "שם מוצר",
      categories: "קטגוריות",
      subCategories: "תת-קטגוריות",
      pricing: "גודל | משקל | מחיר",
    },
    formatTableData: (products: Product[]): TableData[] => products.map(product => ({
      _id: product._id,
      name: product.name,
      categories: product.categories.map((cat, i) => (
        <span key={`cat-${i}`} className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
          {cat.nameInHebrew}
        </span>
      )),
      subCategories: product.subCategories?.map((subCat, i) => (
        <span key={`subCat-${i}`} className="inline-block bg-red-100 text-red-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
          {subCat.nameInHebrew}
        </span>
      )),
      pricing: (
        <div className="flex flex-wrap gap-2">
          {product.pricing.map((p, i) => (
            <span key={`price-${i}`} className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {p.size.sizeName} | ₪{p.price}
            </span>
          ))}
        </div>
      )
    }))
  },
  packages: {
    endpoint: "/packages",
    displayFields: {
      name: "שם חבילה",
      price: "מחיר",
      servings: "מספר אנשים",
      ingredientsCount: "מספר מרכיבים",
    },
    formatTableData: (packages: Package[]): TableData[] => packages.map(pkg => ({
      _id: pkg._id,
      name: pkg.name,
      price: pkg.price + "₪",
      servings: pkg.peoplesQuantity,
      ingredientsCount: pkg.ingredientsQuantity,
    }))
  },
  recipes: {
    endpoint: "/recipes",
    displayFields: {
      name: "שם מתכון",
      categories: "קטגוריות",
      cookingTime: "זמן הכנה",
      servings: "כמות סועדים",
      difficulty: "דרגת קושי"
    },
    formatTableData: (recipes: Recipe[]): RecipeTableData[] => recipes?.map(recipe => ({
      _id: recipe._id,
      name: recipe.name,
      categories: recipe.categories.map((cat, i) => (
        <span key={`cat-${i}`} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {cat.nameInHebrew}
        </span>
      )),
      cookingTime: recipe.prepTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty
    }))
  }
} as const;

function useAdminData<T extends Product | Package | Recipe>(dataType: DataType) {
  const config = adminConfigs[dataType];
  const { useDeleteItemMutation } = useGenericData<T>(config.endpoint);
  const deleteMutation = useDeleteItemMutation();
  
  // Call all hooks at top level (Rules of Hooks)
  const context = useAppContext();
  const shopResult = useShop({ limit: 20 });
  const packagesResult = usePackages({ limit: 20 });
  const recipesResult = useRecipes({ limit: 20 });
  
  // Select the appropriate results based on dataType
  let items: T[];
  let isLoading: boolean;
  let isError: boolean;
  let error: Error | null;
  let setItemToEdit: (item: T) => void;
  
  if (dataType === 'products') {
    items = shopResult.products as T[];
    isLoading = shopResult.isLoading;
    isError = shopResult.isError;
    error = shopResult.error;
    setItemToEdit = (item) => context.setProductToEdit(item as any);
  } else if (dataType === 'packages') {
    items = packagesResult.packages as T[];
    isLoading = packagesResult.isLoading;
    isError = packagesResult.isError;
    error = packagesResult.error;
    setItemToEdit = (item) => context.setPackageToEdit(item as any);
  } else {
    items = recipesResult.recipes as T[];
    isLoading = recipesResult.isLoading;
    isError = recipesResult.isError;
    error = recipesResult.error;
    setItemToEdit = (item) => context.setRecipeToEdit(item as any);
  }

  return useGenericDashboard<T>({
    items,
    isLoading,
    isError,
    error,
    deleteMutation,
    itemType: dataType.slice(0, -1) as any, // Remove 's' to get singular form
    formatTableData: config.formatTableData as any,
    displayFields: config.displayFields,
    setItemToEdit,
  });
}

export default useAdminData; 