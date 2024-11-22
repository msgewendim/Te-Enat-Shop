import { DevTool } from '@hookform/devtools';
import { Package } from '../../../client/types.gen';
import { FormInput } from '../../ui/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../hooks/app/useAppContext';
import { useTranslation } from 'react-i18next';
import { FormProps } from '../../../providers/interface/admin.props';
import { zodResolver } from '@hookform/resolvers/zod';
import { PackageSchema } from '../../../validation/AddPackage.validation';


const PackageForm = ({ item: pkg, onSubmit: onSubmitProp, message }: FormProps<Package>) => {
  const { t } = useTranslation();
  const { register, control, formState: { errors }, reset, handleSubmit } = useForm<Package>({
    defaultValues: pkg || {
      name: '',
      image: '',
      price: 0,
      cookingTime: 0,
      ingredientsQuantity: 0,
      peoplesQuantity: 0
    },
    resolver: zodResolver(PackageSchema)
  })
  const { setAdminActiveSection } = useAppContext();
  const onSubmit: SubmitHandler<Package> = (data) => {
    onSubmitProp(data);
    reset();
    setAdminActiveSection("packages");
    toast.success(message);
  };

  const isEditing = !!pkg;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md h-full relative flex flex-col items-start">
        <h2 className="font-bold text-2xl capitalize p-2 w-full text-center mb-4">
          {isEditing ? t('form.packageForm.editTitle') : t('form.packageForm.addTitle')}
        </h2>

        <div className="mb-4 sm:grid grid-cols-2 gap-6 w-full">
          <FormInput<Package>
            name="name"
            placeholder={t('form.packageForm.namePlaceholder')}
            register={register}
            type="text"
            label={t('form.packageForm.nameLabel')}
            error={errors.name?.message}
          />

          <FormInput<Package>
            name="image"
            placeholder={t('form.packageForm.imagePlaceholder')}
            register={register}
            type="text"
            label={t('form.packageForm.imageLabel')}
            error={errors.image?.message}
          />
          {
            errors.image && <span className="text-red-500">{errors.image.message}</span>
          }

          <FormInput<Package>
            name="price"
            placeholder={t('form.packageForm.pricePlaceholder')}
            register={register}
            className="col-span-2"
            type="number"
            label={t('form.packageForm.priceLabel')}
            error={errors.price?.message}
          />
          {
            errors.cookingTime && <span className="text-red-500">{errors.cookingTime.message}</span>
          }
          <FormInput<Package>
            name="cookingTime"
            placeholder={t('form.packageForm.cookingTimePlaceholder')}
            register={register}
            type="number"
            label={t('form.packageForm.cookingTimeLabel')}
            error={errors.cookingTime?.message}
          />
          {errors.cookingTime && <span className="text-red-500">{errors.cookingTime.message}</span>}
        </div>
        <div className=" w-full">
          <FormInput<Package>
            name="ingredientsQuantity"
            placeholder={t('form.packageForm.ingredientsQuantityPlaceholder')}
            register={register}
            type="number"
            label={t('form.packageForm.ingredientsQuantityLabel')}
            error={errors.ingredientsQuantity?.message}
          />
          {errors.ingredientsQuantity && <span className="text-red-500">{errors.ingredientsQuantity.message}</span>}

          <FormInput<Package>
            name="peoplesQuantity"
            placeholder={t('form.packageForm.peoplesQuantityPlaceholder')}
            register={register}
            type="number"
            label={t('form.packageForm.peoplesQuantityLabel')}
            error={errors.peoplesQuantity?.message}
          />
          {errors.peoplesQuantity && <span className="text-red-500">{errors.peoplesQuantity.message}</span>}
        </div>

        <div className="w-full mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-4 rounded-lg w-full sm:w-52"
          >
            {isEditing ? t('form.packageForm.updateButton') : t('form.packageForm.saveButton')}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default PackageForm;