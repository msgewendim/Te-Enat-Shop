import { useAppContext } from "../../../hooks/app/useAppContext";
import useGenericDashboard, { TableData } from '../../../hooks/app/useGenericDashboard';
import { Recipe } from '../../../client';
import useRecipes from "../../../hooks/recipe/useRecipes";
import { useDeleteRecipeMutation } from "../../../hooks/recipe/useRecipesData";

function useRecipesDashboard() {
  const { setRecipeToEdit } = useAppContext();
  const { recipes, isLoading, isError, error } = useRecipes({ limit: 20 });
  const deleteMutation = useDeleteRecipeMutation();

  const displayFields = {
    name: "שם מתכון",
    categories: "קטגוריות",
    cookingTime: "זמן הכנה",
    servings: "כמות סועדים",
    difficulty: "דרגת קושי"
  } as const;

  const formatTableData = (recipes: Recipe[]): TableData[] => recipes.map(recipe => ({
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
