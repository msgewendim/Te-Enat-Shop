import { DevTool } from '@hookform/devtools';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { AddInstructionsInput, AddIngredientsInput } from './AddArrayInputs';
import { Recipe } from '../../../client/types.gen';
import { useAppContext } from '../../../hooks/app/useAppContext';
import useRecipesForm from '../../../hooks/recipe/useRecipesForm';
import { FormProps } from '../../../providers/interface/admin.props';
import { recipeCategories } from '../../../utils/constants';
import { NODE_MODE } from '../../../utils/env.config';
import { FormInput } from '../../ui/FormInput';
import ModalImageUploader from '../../ui/ModalImageUploader';
import Loader from '../../ui/Loader';
import { AddCategoryInput } from '../products/AddArrayInputFields';


const RecipeForm = ({ item: recipe, onSubmit: onSubmitProp, message, mutateFormState }: FormProps<Recipe>) => {
  const { t } = useTranslation();
  const { existingMainCategories, register, control, handleSubmit, errors, setValue, reset, watch, recipeDifficulty } = useRecipesForm(recipe);
  const { setAdminActiveSection, adminActiveSection } = useAppContext();
  const { isSuccess, isError, isLoading, error } = mutateFormState || { isError: false, isLoading: false, isSuccess: false, error: null };
  const isEditing = !!recipe && adminActiveSection.includes('edit');
  
  const onSubmit: SubmitHandler<Recipe> = (data) => {
    onSubmitProp(data);
    
    if (isLoading) {
      return <Loader />;
    }
    
    if (isError && error) {
      toast.error(error.message);
      return;
    }
    
    if (isSuccess) {
      reset();
      setAdminActiveSection("recipes");
      toast.success(message);
    }
    
    return;
  };
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

          <div className="col-span-2">
            <ModalImageUploader
              label={t('form.recipeForm.imageLabel')}
              currentImageUrl={watch('image')}
              onUpload={(url: string | string[]) => setValue('image', typeof url === 'string' ? url : url[0] || '')}
              onError={(error: string) => toast.error(error)}
              className="w-full"
              folder="recipes"
            />
            {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
          </div>
          <div className="w-full">

            <label htmlFor="difficulty" className="text-sm font-medium text-gray-700">{t('form.recipeForm.difficultyLabel')}</label>
            <select
              id="difficulty"
              {...register("difficulty")}
              className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md
          focus:outline-none focus:ring-2 focus:ring-btnColor2 focus:border-transparent placeholder:text-right"
            >
              {recipeDifficulty.map((difficulty, i) => (
                <option value={difficulty} key={i}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        <AddCategoryInput<Recipe>
          register={register}
          setValue={setValue}
          listOfCategories={recipeCategories}
          initialMainCategories={existingMainCategories}
          type="recipe"
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
      {NODE_MODE === 'development' && <DevTool control={control} />}
    </>
  );
};

export default RecipeForm;