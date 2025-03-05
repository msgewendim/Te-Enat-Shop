import { Recipe } from '../../../client';
import { useAppContext } from "../../../hooks/app/useAppContext";
import useGenericDashboard from '../../../hooks/app/useGenericDashboard';
import useGenericData from "../../../hooks/app/useGenericData";
import useRecipes from "../../../hooks/recipe/useRecipes";
import { RecipeTableData } from "../../../providers/interface/admin.props";

function useRecipesDashboard() {
  const { setRecipeToEdit } = useAppContext();
  const { useDeleteItemMutation } = useGenericData<Recipe>("/recipes");
  const deleteMutation = useDeleteItemMutation();
  const { recipes, isLoading, isError, error } = useRecipes({ limit: 20 });

  const displayFields = {
    name: "שם מתכון",
    categories: "קטגוריות",
    cookingTime: "זמן הכנה",
    servings: "כמות סועדים",
    difficulty: "דרגת קושי"
  } as const;

  const formatTableData = (recipes: Recipe[]): RecipeTableData[] => recipes.map(recipe => ({
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
  }));

  return useGenericDashboard<Recipe>({
    items: recipes,
    isLoading,
    isError,
    error,
    deleteMutation,
    itemType: "recipe",
    formatTableData,
    displayFields,
    setItemToEdit: (recipe) => setRecipeToEdit(recipe),
  });
}

export default useRecipesDashboard;
