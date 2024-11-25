import { DevTool } from '@hookform/devtools';
import { Product } from '../../../client/types.gen';
import { FormInput } from '../../ui/FormInput';
import useProductForm from '../../../hooks/product/useProductForm';
import { AddCategoryInput, AddFeatureGroupInput, AddPricingInput } from './AddArrayInputFields';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../hooks/app/useAppContext';
import { productCategories } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { FormProps } from '../../../providers/interface/admin.props';

const ProductForm = ({ item: product, onSubmit: onSubmitProp, message }: FormProps<Product>) => {
  const { t } = useTranslation();
  const { register, control, errors, handleSubmit, setValue, reset, existingMainCategories, existingSubCategories } = useProductForm(product);
  const { setAdminActiveSection } = useAppContext();

  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data);
    onSubmitProp(data);
    reset();
    setAdminActiveSection("products");
    toast.success(message);
  };

  const isEditing = !!product;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md h-full relative flex flex-col items-start">
        <h2 className="font-bold text-2xl capitalize p-2 w-full text-center mb-4">
          {isEditing ? t('form.productForm.editTitle') : t('form.productForm.addTitle')}
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

          <FormInput<Product>
            name="image"
            placeholder={t('form.productForm.imagePlaceholder')}
            register={register}
            className="col-span-2"
            type="text"
            label={t('form.productForm.imageLabel')}
            error={errors.image?.message}
          />

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
            {isEditing ? t('form.productForm.updateButton') : t('form.productForm.saveButton')}
          </button>
        </div>
        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ProductForm;