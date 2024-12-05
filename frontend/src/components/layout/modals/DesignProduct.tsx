import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../ui/FormInput";
import GenericModal from "../../ui/Modal";

const DesignProductPopup = ({ isPopupOpen, handleClosePopup }: { isPopupOpen: boolean, handleClosePopup: () => void }) => {
  const { t } = useTranslation();
  return <GenericModal title={t('designProduct.title')} content={<DesignProductPopupContent handleClosePopup={handleClosePopup} />} open={isPopupOpen} setOpen={handleClosePopup} />
}

const DesignProductPopupContent = ({ handleClosePopup }: { handleClosePopup: () => void }) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<DesignProductFormData>();

  // TODO: add backend call
  const onSubmit = (data: DesignProductFormData) => {
    const validationResult = validateDesignProductForm(data);
    if (validationResult.success) {
      console.log(data);
    } else {
      console.log(validationResult.error.errors);
    }
  };

  return (
    <article>
      <p className="text-md font-normal mb-4">
        {t('designProduct.message').split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <section aria-labelledby="personal-details-heading">
          <h3 id="personal-details-heading" className="text-lg font-semibold text-gray-800 mb-4">
            {t('designProduct.details')}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.email')}
              label={t('designProduct.email')}
              register={register}
              name="email"
              required
            />
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.fullName')}
              label={t('designProduct.fullName')}
              register={register}
              name="fullName"
              required
            />
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.phone')}
              label={t('designProduct.phone')}
              register={register}
              name="phone"
              required
            />
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.street')}
              label={t('designProduct.street')}
              register={register}
              name="street"
              required
              className="sm:col-span-2"
            />
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.city')}
              label={t('designProduct.city')}
              register={register}
              name="city"
              required
            />
            <FormInput<DesignProductFormData>
              placeholder={t('designProduct.zipCode')}
              label={t('designProduct.zipCode')}
              register={register}
              name="zipCode"
            />
            <FormInput<DesignProductFormData>
              type="date"
              placeholder={t('designProduct.birthDate')}
              label={t('designProduct.birthDate')}
              register={register}
              name="birthDate"
            />
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            type="button"
            onClick={handleClosePopup}
            className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-transparent hover:bg-btnColor1 hover:text-white border border-gray-300 text-gray-800 transition-colors"
          >
            {t('designProduct.cancel')}
          </button>
          <button
            type="submit"
            className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white transition-colors"
          >
            {t('designProduct.submit')}
          </button>
        </div>
      </form>
    </article>
  );
}

type DesignProductFormData = {
  email: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  birthDate: Date;
}

const validateDesignProductForm = (data: DesignProductFormData) => {
  return z.object({
    email: z.string().email(),
    fullName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().optional(),
    birthDate: z.date().optional(),
  }).safeParse(data);
}

export default DesignProductPopup;