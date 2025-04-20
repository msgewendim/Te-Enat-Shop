"use client"
import { useForm } from 'react-hook-form'

import { Recipe } from '../../client/types.gen';

function useRecipesForm(initialRecipe?: Recipe) {
  const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Recipe>({
    defaultValues: initialRecipe || {
      image: "",
      categories: [],
      name: "",
      description: "",
      difficulty: "Easy",
      ingredients: [],
      instructions: [],
      prepTime: "",
      servings: 0,
      _id: "",
      
    },
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
    existingMainCategories,
    recipeDifficulty
  }
}

export default useRecipesForm