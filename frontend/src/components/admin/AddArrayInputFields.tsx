import { useTranslation } from 'react-i18next';
import { Path, useFieldArray } from 'react-hook-form'
import { Product } from '../../client/types.gen';
import { FormInput } from '../ui/FormInput';
import { FC, useEffect, useState } from 'react';
import { AddCategoryInputProps, ArrayInputFieldProps } from '../../providers/interface/admin.props';

export const AddFeatureGroupInput = ({ control, register }: ArrayInputFieldProps) => {
  const { t } = useTranslation();
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features.value'
  });

  return (
    <fieldset className="mb-4 w-full">
      <legend className="font-bold text-xl mb-4">{t('form.addFeatureGroup.title')}</legend>
      <div className="space-y-4 w-full lg:grid grid-cols-2 items-end justify-end">
        {featureFields.map((field, index) => (
          <div key={field.id} className="w-full border p-4 rounded">
            <h3 className="font-bold text-right mb-2">{t('form.addFeatureGroup.featureTitle', { number: index + 1 })}</h3>
            <div className="flex flex-col space-y-2">
              <label htmlFor={`feature-title-${index}`} className="sr-only">{t('form.addFeatureGroup.inputTitlePlaceholder', { number: index + 1 })}</label>
              <input
                id={`feature-title-${index}`}
                {...register(`features.value.${index}.title` as const)}
                placeholder={t('form.addFeatureGroup.inputTitlePlaceholder', { number: index + 1 })}
                required
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2"
              />
              <label htmlFor={`feature-description-${index}`} className="sr-only">{t('form.addFeatureGroup.inputDescriptionPlaceholder', { number: index + 1 })}</label>
              <textarea
                id={`feature-description-${index}`}
                {...register(`features.value.${index}.description` as const)}
                placeholder={t('form.addFeatureGroup.inputDescriptionPlaceholder', { number: index + 1 })}
                required
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2"
              />
              <FormButton
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 bg-yellow-100 px-4 py-2 rounded"
                aria-label={t('form.addFeatureGroup.removeFeatureLabel', { number: index + 1 })}
                text={t('form.addFeatureGroup.removeFeature')}
              />
            </div>
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        onClick={() => appendFeature({ title: '', description: '' })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        text={t('form.addFeatureGroup.addFeature')}
      />

    </fieldset>
  );
};

export const AddPricingInput = ({ control, register }: ArrayInputFieldProps) => {
  const { t } = useTranslation();
  const { fields: pricingFields, append: appendPricing, remove: removePricing } = useFieldArray({
    control,
    name: "pricing"
  });

  return (
    <fieldset className='flex flex-col w-full'>
      <legend className="font-bold text-xl mb-4">{t('form.addPricing.title')}</legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {pricingFields.map((field, index) => (
          <div key={field.id} className="grid sm:flex items-center gap-2">
            <FormInput<Product>
              register={register}
              name={`pricing.${index}.size` as Path<Product>}
              placeholder={t('form.addPricing.sizeLabel', { number: index + 1 })}
              type="text"
              required
            />
            <FormInput<Product>
              register={register}
              name={`pricing.${index}.price` as Path<Product>}
              placeholder={t('form.addPricing.priceLabel')}
              type="number"
              required
              registerOptions={{ valueAsNumber: true }}
              className=''
            />
            <FormButton
              type="button"
              onClick={() => removePricing(index)}
              className="text-red-500 bg-yellow-100"
              aria-label={t('form.addPricing.removePriceLabel', { number: index + 1 })}
              text={t('form.addPricing.removePrice')}
            />
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        onClick={() => appendPricing({ size: '', price: 0 })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-fit"
        text={t('form.addPricing.addPrice')} />
    </fieldset>
  );
};

export const AddCategoryInput: FC<AddCategoryInputProps> = ({ register, setValue, categories, initialCategories }) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories || []);

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(value)
        ? prev.filter(cat => cat !== value)
        : [...prev, value];

      setValue('categories', newSelection);
      return newSelection;
    });
  };

  useEffect(() => {
    setValue('categories', selectedCategories);
  }, [setValue, initialCategories, selectedCategories]);

  return (
    <fieldset className='flex flex-col items-start justify-start mb-3'>
      <legend className="mb-4 font-semibold text-gray-900 dark:text-white">{t('form.addCategory.title')}</legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.addCategory.categoriesAriaLabel')}>
        {categories.map(({ name, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => toggleCategory(value)}
            onKeyUp={(e) => e.key === 'Enter' && toggleCategory(value)}
            className={`px-3 py-1 text-sm font-medium rounded-full ${selectedCategories.includes(value)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            aria-pressed={selectedCategories.includes(value)}
          >
            {name}
          </button>
        ))}
      </div>

      <input
        type="hidden"
        {...register('categories')}
        value={selectedCategories}
      />
    </fieldset>
  );
};

interface FormButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  text: string;
  ariaLabel?: string;
  className?: string;
}
const FormButton = ({ type, onClick, ariaLabel, className, text }: FormButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full md:w-fit py-2 px-4 rounded-md ${className || ''}`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  )
}