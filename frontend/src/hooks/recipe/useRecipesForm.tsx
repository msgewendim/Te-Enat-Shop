import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'

import { Recipe } from '../../client/types.gen';
import { RecipeSchema } from '../../validation/AddRecipe.validation';

function useRecipesForm(initialRecipe?: Recipe) {
  const { register, control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<Recipe>({
    defaultValues: initialRecipe || {
      image: "",
      categories: [],
      name: "",
      description: "",
      difficulty: "Easy",
      ingredients: [],
      instructions: []
    },
    resolver: zodResolver(RecipeSchema)  // validate the form
  });
  const existingMainCategories = initialRecipe?.categories || [];
  const recipeDifficulty = ["Easy", "Medium", "Hard"];
  return {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    reset,
    watch,
    existingMainCategories,
    recipeDifficulty
  }
}

export default useRecipesForm