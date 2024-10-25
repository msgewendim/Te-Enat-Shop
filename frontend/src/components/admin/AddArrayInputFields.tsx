import { Control, Path, useFieldArray, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Category, Product } from '../../client/types.gen';
import { FormInput } from '../ui/FormInput';
import { FC, useState } from 'react';

type ArrayInputFieldProps = {
  control: Control<Product>,
  register: UseFormRegister<Product>
}
interface AddCategoryInputProps {
  register: UseFormRegister<Product>;
  setValue: UseFormSetValue<Product>;
  categories: Category[];
}

const AddFeatureGroupInput = ({ control, register }: ArrayInputFieldProps) => {
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features.value'
  })
  const handleRemoveFeature = (index: number) => {
    removeFeature(index);
  }

  const handleAddFeature = () => {
    appendFeature({ title: '', description: '' });
  }
  return (
    <div className="mb-4 w-full">
      <h3 className="font-bold text-xl">
        יתרונות בריאותיים
      </h3>
      <div className="space-y-4 w-full">
        {featureFields.map((field, index) => (
          <div key={field.id} className="w-full border p-4 rounded">
            <h3 className="font-bold text-right">
              יתרון {index + 1}
            </h3>
            <div className="flex flex-col space-y-2">
              <input
                {...register(`features.value.${index}.title`)}
                placeholder={`כותרת יתרון מס' ${index + 1}`}
                required
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2"
              />
              <textarea
                {...register(`features.value.${index}.description`)}
                placeholder={`תיאור יתרון מס' ${index + 1}`}
                required
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 bg-yellow-100 px-4 py-2"
              >
                הסר
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddFeature}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        הוסף יתרון
      </button>
    </div>
  )
}


const AddPricingInput = ({ control, register }: ArrayInputFieldProps) => {
  const { fields: pricingFields, append: appendPricing, remove: removePricing } = useFieldArray({
    control,
    name: "pricing"
  });

  return (
    <div className='flex flex-col'>
      <h3 className="font-bold text-xl">מחירים</h3>
      <div className="grid grid-cols-2 gap-3">
        {
          pricingFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 space-x-6">
              <FormInput<Product>
                register={register}
                name={`pricing.${index}.size` as Path<Product>}
                placeholder={`משקל / גודל ${index + 1}`}
                type="text"
                required
                classNames=''
              />
              <FormInput<Product>
                register={register}
                name={`pricing.${index}.price` as Path<Product>}
                placeholder="סכום"
                type="number"
                required
                registerOptions={{ valueAsNumber: true }}
                classNames=''
              />
              <button type="button" onClick={() => removePricing(index)} className="text-red-500 bg-yellow-100 rounded-md w-fit p-2 ">הסר</button>
            </div>
          ))
        }
      </div>
      < button type="button" onClick={() => appendPricing({ size: '', price: 0 })} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-fit" >
        הוסף מחיר וגודל
      </button >
    </div>
  )
}

const AddCategoryInput: FC<AddCategoryInputProps> = ({ register, setValue, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(value)
        ? prev.filter(cat => cat !== value)
        : [...prev, value];

      setValue('categories', newSelection);
      return newSelection;
    });
  };
  return (
    <div className='flex flex-col items-start justify-start mb-3'>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">קטגוריות</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(({ name, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => toggleCategory(value)}
            className={`px-3 py-1 text-sm font-medium rounded-full ${selectedCategories.includes(value)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        {...register('categories')}
        value={selectedCategories}
      />
    </div>
  );
}

export {
  AddFeatureGroupInput,
  AddPricingInput,
  AddCategoryInput
}