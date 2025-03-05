import { useState } from 'react';
import { FieldValues, Path, PathValue, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next';

import { Category, Product, SubCategory } from '../../../client/types.gen';
import { AddCategoryInputProps, ArrayInputFieldProps } from '../../../providers/interface/admin.props';
import { isCategorySelected, subCategoriesByParentCategoryKey } from '../../../utils/helperFunctions';
import FormButton from '../../ui/FormButton';
import { FormInput } from '../../ui/FormInput';

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
      <div className="grid gap-3">
        {pricingFields.map((field, index) => (
          <div key={field.id} className="grid sm:flex items-center gap-2">
            <FormInput<Product>
              register={register}
              name={`pricing.${index}.size.sizeName` as Path<Product>}
              placeholder={t('form.addPricing.sizeLabel', { number: index + 1 })}
              type="text"
              required
            />
            <FormInput<Product>
              register={register}
              name={`pricing.${index}.size.sizeQuantity` as Path<Product>}
              placeholder={t('form.addPricing.sizeQuantityLabel')}
              type="number"
              required
              registerOptions={{ valueAsNumber: true }}
            />
            <FormInput<Product>
              register={register}
              name={`pricing.${index}.price` as Path<Product>}
              placeholder={t('form.addPricing.priceLabel')}
              type="number"
              required
              registerOptions={{ valueAsNumber: true }}
            />
            <FormButton
              type="button"
              onClick={() => removePricing(index)}
              className="text-red-500 bg-yellow-100"
              aria-label={t('form.addPricing.removePriceLabel', { number: index + 1 })}
              text={t('buttons.remove')}
            />
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        onClick={() => appendPricing({ size: { sizeName: '', sizeQuantity: 0 }, price: 0 })}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-fit"
        text={t('buttons.add')} />
    </fieldset>
  );
};

export const AddCategoryInput = <T extends FieldValues>({ register, setValue, listOfCategories, initialMainCategories, initialSubCategories, type }: AddCategoryInputProps<T>) => {
  const { t } = useTranslation();
  const [selectedMainCategories, setSelectedMainCategories] = useState<Category[]>(initialMainCategories || []);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCategory[]>(initialSubCategories || []);
  
  const handleMainCategoryToggle = (category: Category) => {
    setSelectedMainCategories((prev) => {
      const isSelected = isCategorySelected(category, "mainCategory", prev, selectedSubCategories);
      const newSelection = isSelected
        ? prev.filter((cat) => cat.nameInEnglish !== category.nameInEnglish)
        : [...prev, category];

      // When deselecting a main category, remove its subcategories
      if (!isSelected) {
        setSelectedSubCategories([]);
      } else {
        setSelectedSubCategories((prev) =>
          prev.filter((subCat) => !subCategoriesByParentCategoryKey(category.nameInEnglish, type).some((cat) => cat === subCat))
        );
      } 
      // Update the form value for main categories
      setValue('categories' as Path<T>, newSelection as PathValue<T, Path<T>>);
      return newSelection;
    });
  };

  const handleSubCategoryToggle = (subCategory: SubCategory, mainParentCategory: Category) => {
    // Only allow selecting subcategories if parent is selected
    if (!isCategorySelected(mainParentCategory, "mainCategory", selectedMainCategories, selectedSubCategories)) return;
    setSelectedSubCategories((prev) => {  
      const isSelected = isCategorySelected(subCategory, "subCategory", selectedMainCategories, prev);
      const newSelection = isSelected
        ? prev.filter((cat) => cat.nameInEnglish !== subCategory.nameInEnglish)
        : [...prev, subCategory];
      // Update form value for subcategories
      setValue('subCategories' as Path<T>, newSelection as PathValue<T, Path<T>>);
      return newSelection;
    });
  };

  
  return (
    <fieldset className='flex flex-col items-start justify-start mb-3'>
      <legend className="mb-4 font-semibold text-gray-900 dark:text-white">
        {t('form.addCategory.title')}
      </legend>

      {/* Main Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {listOfCategories.map((category) => (
          <button
            key={category.nameInEnglish}
            type="button"
            onClick={() => handleMainCategoryToggle(category)}
            className={`px-3 py-1 text-sm font-medium rounded-full ${isCategorySelected(category, "mainCategory", selectedMainCategories, selectedSubCategories) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            aria-pressed={isCategorySelected(category, "mainCategory", selectedMainCategories, selectedSubCategories)}
          >
            {category.nameInHebrew}
          </button>
        ))}
      </div>

      {/* Subcategories - only show for selected main categories and for product only */}
      {type === "product" && selectedMainCategories.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-2">{t('form.addCategory.subCategories')}</h4>
          <div className="flex flex-wrap gap-2">
            {selectedMainCategories.map((category) =>
              subCategoriesByParentCategoryKey(category.nameInEnglish, type)?.map((subCat) => (
                <button
                  key={subCat.nameInEnglish}
                  type="button"
                  onClick={() => handleSubCategoryToggle(subCat, category)}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${isCategorySelected(subCat, "subCategory", selectedMainCategories, selectedSubCategories) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                  aria-pressed={isCategorySelected(subCat, "subCategory", selectedMainCategories, selectedSubCategories)}
                >
                  {subCat.nameInHebrew}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <input
        type="hidden"
        {...register('categories' as Path<T>)}
        value={JSON.stringify(selectedMainCategories)}
      />
      {type === "product" && (
        <input
          type="hidden"
          {...register('subCategories' as Path<T>)}
          value={JSON.stringify(selectedSubCategories)}
        />
      )}
    </fieldset>
  );
};

