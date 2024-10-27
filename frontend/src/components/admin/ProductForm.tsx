import { DevTool } from '@hookform/devtools'
import { Product } from '../../client/types.gen';
import { FormInput } from '../ui/FormInput';
import useProductForm from '../../hooks/useProductForm';
import { AddCategoryInput, AddFeatureGroupInput, AddPricingInput } from './AddArrayInputFields'
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppContext } from '../../hooks/useAppContext';
import { productCategories } from '../../utils/constants';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Product) => void;
  message: string;
}

const ProductForm = ({ product, onSubmit: onSubmitProp, message }: ProductFormProps) => {
  const { register, control, errors, handleSubmit, setValue, reset, existingCategories } = useProductForm(product)
  const { setAdminActiveSection } = useAppContext()
  const onSubmit: SubmitHandler<Product> = (data) => {
    // send to server the new product
    onSubmitProp(data)
    reset()
    // navigate to the product list page or show a success message
    setAdminActiveSection("products")
    toast.success(`${message}`)
  };

  const isEditing = !!product;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md h-full relative flex flex-col items-start">
        <div className="text-center">
          <h2 className="font-bold text-2xl capitalize p-2">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>

        <div className="mb-4 grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <FormInput<Product>
            name="name"
            placeholder="שם מוצר"
            register={register}
            classNames=""
            type="text"
          />
          {errors.name &&
            <span className="text-red-500">{errors.name.message}</span>
          }
          {/* Short Description */}
          <FormInput<Product>
            name="shortDescription"
            placeholder="תיאור מוצר"
            register={register}
            classNames=""
            type="text"
          />
          {errors.shortDescription &&
            <span className="text-red-500">{errors.shortDescription.message}</span>
          }
          {/* Images array */}
          <FormInput<Product>
            name="image"
            placeholder="כתובת תמונה"
            register={register}
            classNames="col-span-2"
            type="text"
          />
          {errors.image &&
            <span className="text-red-500">{errors.image.message}</span>
          }
          {/* Pricing array */}
          <div className="col-span-2">
            <AddPricingInput
              control={control}
              register={register}
            />
            {errors.pricing &&
              <span className="text-red-500">{errors.pricing.message}</span>
            }
          </div>
        </div>
        {/* Categories */}
        <AddCategoryInput register={register} setValue={setValue} categories={productCategories} initialCategories={existingCategories} />
        {errors.categories &&
          <span className="text-red-500">{errors.categories.message}</span>
        }
        {/* Features Section (Array of Arrays) */}
        <AddFeatureGroupInput control={control} register={register} />
        {errors.features &&
          <span className="text-red-500">{errors.features.message}</span>
        }
        {/* Save Btn */}
        <div className="w-52">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-4 rounded-lg w-full"
          >
            {isEditing ? 'Update' : 'Save'}
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </>
  );
};


export default ProductForm;

