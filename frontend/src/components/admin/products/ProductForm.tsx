import { DevTool } from '@hookform/devtools';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { AddCategoryInput, AddFeatureGroupInput, AddPricingInput } from './AddArrayInputFields';
import { Product } from '../../../client/types.gen';
import { useAppContext } from '../../../hooks/app/useAppContext';
import useProductForm from '../../../hooks/product/useProductForm';
import { FormProps } from '../../../providers/interface/admin.props';
import { productCategories } from '../../../utils/constants';
import { FormInput } from '../../ui/FormInput';
import ModalImageUploader from '../../ui/ModalImageUploader';
import Loader from '../../ui/Loader';

const ProductForm = ({ item: product, onSubmit: onSubmitProp, message, mutateFormState }: FormProps<Product>) => {
  const { t } = useTranslation();
  const { register, control, errors, handleSubmit, setValue, watch, reset, existingMainCategories, existingSubCategories } = useProductForm(product);
  const { setAdminActiveSection, adminActiveSection } = useAppContext();
  const isEditMode = adminActiveSection.includes('edit') && !!product;
  const { isSuccess, isError, isLoading, error } = mutateFormState || { isError: false, isLoading: false, isSuccess: false, error: null };
  
  const onSubmit: SubmitHandler<Product> = (data) => {
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
      setAdminActiveSection("products");
      toast.success(message);
    }
    
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md h-full relative flex flex-col items-start">
        <h2 className="font-bold text-2xl capitalize p-2 w-full text-center mb-4">
          {isEditMode ? t('form.productForm.editTitle') : t('form.productForm.addTitle')}
        </h2>

        <div className="mb-4 sm:grid grid-cols-2 gap-6 w-full">
          <FormInput<Product>
            name="name"
            placeholder={t('form.productForm.namePlaceholder')}
            register={register}
            type="text"
            label={t('form.productForm.nameLabel')}
            error={errors.name?.message}
          />

          <FormInput<Product>
            name="shortDescription"
            placeholder={t('form.productForm.descriptionPlaceholder')}
            register={register}
            type="text"
            label={t('form.productForm.descriptionLabel')}
            error={errors.shortDescription?.message}
          />

          <div className="col-span-2">
            <ModalImageUploader
              label={t('form.productForm.imageLabel')}
              currentImageUrl={watch('image')}
              onUpload={(url: string | string[]) => setValue('image', typeof url === 'string' ? url : url[0] || '')}
              onError={(error: string) => toast.error(error)}
              className="w-full"
              folder="products"
            />
            {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
          </div>

        </div>
        <div className=" w-full">
          <AddPricingInput
            control={control}
            register={register}
          />
          {errors.pricing && <span className="text-red-500">{errors.pricing[0]?.size?.message}</span>}
          {errors.pricing && <span className="text-red-500">{errors.pricing[0]?.price?.message}</span>}
          {errors.pricing && <span className="text-red-500">{errors.pricing[0]?.message}</span>}
        </div>

        <AddCategoryInput<Product>
          register={register}
          setValue={setValue}
          listOfCategories={productCategories}
          initialMainCategories={existingMainCategories}
          initialSubCategories={existingSubCategories}
          type="product"
        />
        {errors.categories && <span className="text-red-500">{errors.categories[0]?.message}</span>}
        {errors.subCategories && <span className="text-red-500">{errors.subCategories[0]?.message}</span>}

        <AddFeatureGroupInput control={control} register={register} />
        {errors.features && <span className="text-red-500">{errors.features.value?.message}</span>}

        <div className="w-full mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-4 rounded-lg w-full sm:w-52"
          >
            {isEditMode ? t('form.productForm.updateButton') : t('form.productForm.saveButton')}
          </button>
        </div>
        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ProductForm;