import { useEffect } from 'react';
import { Path } from 'react-hook-form';
import FormButton from '../../ui/FormButton';
import { Recipe } from '../../../client/types.gen';
import { useTranslation } from 'react-i18next';
import { UseFormRegister, Control, useFieldArray } from 'react-hook-form';
import { FormInput } from '../../ui/FormInput';


const AddInstructionsInput = ({ register, control, name }: {
  register: UseFormRegister<Recipe>,
  control: Control<Recipe>,
  name: 'instructions',
}) => {
  const { t } = useTranslation();
  const { fields: instructionsFields, append: appendInstructions, remove: removeInstructions } = useFieldArray({
    control,
    name,
    rules: { minLength: 1 } // Ensure at least one instruction
  });

  // Add default instruction if none exists
  useEffect(() => {
    if (instructionsFields.length === 0) {
      appendInstructions({ _id: crypto.randomUUID(), step: 1, description: "" });
    }
  }, [instructionsFields.length, appendInstructions]);

  return (
    <fieldset className='flex flex-col w-full'>
      <legend className="font-bold text-xl mb-4">{t('form.recipeForm.instructionsLabel')}</legend>
      <div className="flex flex-col gap-3 w-full">
        {instructionsFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 w-full">
            <span className="min-w-[40px] text-center font-medium">
              {index + 1}.
            </span>
            <div className="flex-grow">
              <FormInput<Recipe>
                register={register}
                name={`instructions.${index}.description` as Path<Recipe>}
                placeholder={t('form.recipeForm.instructionDescription', { number: index + 1 })}
                type="text"
                required
              />
            </div>
            {instructionsFields.length > 1 && ( // Only show remove button if more than one instruction
              <FormButton
                type="button"
                onClick={() => removeInstructions(index)}
                className="text-red-500 bg-yellow-100 shrink-0"
                aria-label={t('buttons.remove')}
                text={t('buttons.remove')}
              />
            )}
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        onClick={() => appendInstructions({ _id: crypto.randomUUID(), step: instructionsFields.length + 1, description: "" })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-fit"
        text={t('buttons.add')} />
    </fieldset>
  );
};

const AddIngredientsInput = ({ register, control, name }: {
  register: UseFormRegister<Recipe>,
  control: Control<Recipe>,
  name: 'ingredients',
}) => {
  const { t } = useTranslation();
  const { fields: ingredientsFields, append: appendIngredients, remove: removeIngredients } = useFieldArray({
    control,
    name,
    rules: { minLength: 1 }
  });

  useEffect(() => {
    if (ingredientsFields.length === 0) {
      appendIngredients({ _id: crypto.randomUUID(), name: '', quantity: "" });
    }
  }, [ingredientsFields.length, appendIngredients]);

  return (
    <fieldset className='flex flex-col w-full'>
      <legend className="font-bold text-xl mb-4">{t('form.recipeForm.ingredientsLabel')}</legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {ingredientsFields.map((field, index) => (
          <div key={field.id} className="grid sm:flex items-center gap-2">
            <FormInput<Recipe>
              register={register}
              name={`ingredients.${index}.name` as Path<Recipe>}
              placeholder={t('form.recipeForm.ingredientName', { number: index + 1 })}
              type="text"
              required
            />
            <FormInput<Recipe>
              register={register}
              name={`ingredients.${index}.quantity` as Path<Recipe>}
              placeholder={t('form.recipeForm.ingredientQuantity')}
              type="text"
              required
              className=''
            />
            {ingredientsFields.length > 1 && (
              <FormButton
                type="button"
                onClick={() => removeIngredients(index)}
                className="text-red-500 bg-yellow-100"
                aria-label={t('buttons.remove')}
                text={t('buttons.remove')}
              />
            )}
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        onClick={() => appendIngredients({ _id: crypto.randomUUID(), name: '', quantity: "" })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-fit"
        text={t('buttons.add')} />
    </fieldset>
  );
}

export { AddInstructionsInput, AddIngredientsInput };
