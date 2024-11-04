import { DevTool } from '@hookform/devtools';
import { Recipe } from '../../../client/types.gen';
import { FormInput } from '../../ui/FormInput';
import { AddCategoryInput } from '../products/AddArrayInputFields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../hooks/useAppContext';
import { recipeCategories } from '../../../utils/constants';
import { RecipeFormProps } from '../../../providers/interface/admin.props';
import { useTranslation } from 'react-i18next';
import { AddInstructionsInput, AddIngredientsInput } from './AddArrayInputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecipeSchema } from '../../../validation/AddRecipe.validation';



const RecipeForm = ({ recipe, onSubmit: onSubmitProp, message }: RecipeFormProps) => {
  const { t } = useTranslation();
  const { register, setValue, control, formState: { errors }, reset, handleSubmit } = useForm<Recipe>({
    defaultValues: recipe || {
      name: '',
      image: '',
      description: '',
      categories: [],
      prepTime: "",
      servings: 1,
      difficulty: "Easy",
      ingredients: [],
      instructions: []
    },
    resolver: zodResolver(RecipeSchema)
  })
  const { setAdminActiveSection } = useAppContext();
  const existingCategories = recipe?.categories || [];
  const onSubmit: SubmitHandler<Recipe> = (data) => {
    console.log(data);
    onSubmitProp(data);
    reset();
    setAdminActiveSection("recipes");
    toast.success(message);
  };

  const isEditing = !!recipe;
  const recipeDifficulty = ["Easy", "Medium", "Hard"];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md h-full relative flex flex-col items-start">
        <h2 className="font-bold text-2xl capitalize p-2 w-full text-center mb-4">
          {isEditing ? t('form.recipeForm.editTitle') : t('form.recipeForm.addTitle')}
        </h2>

        <div className="mb-4 sm:grid grid-cols-2 gap-6 w-full">
          <FormInput<Recipe>
            name="name"
            placeholder={t('form.recipeForm.namePlaceholder')}
            register={register}
            type="text"
            label={t('form.recipeForm.nameLabel')}
            error={errors.name?.message}
          />

          <FormInput<Recipe>
            name="description"
            placeholder={t('form.recipeForm.descriptionPlaceholder')}
            register={register}
            type="text"
            label={t('form.recipeForm.descriptionLabel')}
            error={errors.description?.message}
          />

          <FormInput<Recipe>
            name="image"
            placeholder={t('form.recipeForm.imagePlaceholder')}
            register={register}
            className="col-span-2"
            type="text"
            label={t('form.recipeForm.imageLabel')}
            error={errors.image?.message}
          />
          <div className="w-full">

            <label htmlFor="difficulty" className="text-sm font-medium text-gray-700">{t('form.recipeForm.difficultyLabel')}</label>
            <select
              id="difficulty"
              {...register("difficulty")}
              className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md
          focus:outline-none focus:ring-2 focus:ring-btnColor2 focus:border-transparent placeholder:text-right"
            >
              {recipeDifficulty.map((difficulty) => (
                <option value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        <AddCategoryInput<Recipe>
          register={register}
          setValue={setValue}
          categories={recipeCategories}
          initialCategories={existingCategories}
        />
        {errors.categories && <span className="text-red-500">{errors.categories.message}</span>}

        <div className="mb-4 sm:grid grid-cols-2 gap-6 w-full">
          <FormInput<Recipe>
            name="prepTime"
            placeholder={t('form.recipeForm.prepTimePlaceholder')}
            register={register}
            type="text"
            label={t('form.recipeForm.prepTimeLabel')}
            error={errors.prepTime?.message}
          />

          <FormInput<Recipe>
            name="servings"
            placeholder={t('form.recipeForm.servingsPlaceholder')}
            register={register}
            registerOptions={{
              valueAsNumber: true
            }}
            type="number"
            label={t('form.recipeForm.servingsLabel')}
            error={errors.servings?.message}
          />
        </div>
        <AddInstructionsInput register={register} control={control} name="instructions" />
        {errors.instructions && <span className="text-red-500">{errors.instructions.message}</span>}
        <AddIngredientsInput register={register} control={control} name="ingredients" />
        {errors.ingredients && <span className="text-red-500">{errors.ingredients.message}</span>}

        <div className="w-full mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-4 rounded-lg w-full sm:w-52"
          >
            {isEditing ? t('buttons.update') : t('buttons.save')}
          </button>
        </div>
      </form>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
    </>
  );
};

export default RecipeForm;