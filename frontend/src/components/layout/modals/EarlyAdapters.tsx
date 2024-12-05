import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../ui/FormInput";
import GenericModal from "../../ui/Modal";

const EarlyAdoptersPopup = ({ isPopupOpen, handleClosePopup }: { isPopupOpen: boolean, handleClosePopup: () => void }) => {
  const { t } = useTranslation();
  return (
    <GenericModal
      title={t('earlyAdopters.title')}
      content={<EarlyAdoptersPopupContent handleClosePopup={handleClosePopup} />}
      open={isPopupOpen}
      setOpen={handleClosePopup}
    />
  );
}

const EarlyAdoptersPopupContent = ({ handleClosePopup }: { handleClosePopup: () => void }) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<EarlyAdoptersFormData>();

  // TODO: add backend call
  const onSubmit = (data: EarlyAdoptersFormData) => {
    const validationResult = validateEarlyAdoptersForm(data);
    if (validationResult.success) {
      console.log(data);
    } else {
      console.log(validationResult.error.errors);
    }
  };

  return (
    <article>
      <p className="text-md font-normal mb-4">{
        t('earlyAdopters.message').split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <section aria-labelledby="personal-details-heading">
          <h3 id="personal-details-heading" className="text-lg font-semibold text-gray-800 mb-4">
            {t('earlyAdopters.details')}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormInput<EarlyAdoptersFormData>
              placeholder={t('earlyAdopters.email')}
              label={t('earlyAdopters.email')}
              register={register}
              name="email"
              required
            />
            <FormInput<EarlyAdoptersFormData>
              placeholder={t('earlyAdopters.fullName')}
              label={t('earlyAdopters.fullName')}
              register={register}
              name="fullName"
              required
            />
            <FormInput<EarlyAdoptersFormData>
              placeholder={t('earlyAdopters.street')}
              label={t('earlyAdopters.street')}
              register={register}
              name="street"
              required
              className="sm:col-span-2"
            />
            <FormInput<EarlyAdoptersFormData>
              placeholder={t('earlyAdopters.city')}
              label={t('earlyAdopters.city')}
              register={register}
              name="city"
              required
            />
            <FormInput<EarlyAdoptersFormData>
              type="tel"
              placeholder={t('earlyAdopters.phone')}
              label={t('earlyAdopters.phone')}
              register={register}
              name="phone"
              required
            />
            <FormInput<EarlyAdoptersFormData>
              type="date"
              placeholder={t('earlyAdopters.birthDate')}
              label={t('earlyAdopters.birthDate')}
              register={register}
              registerOptions={{ valueAsDate: true }}
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
            {t('earlyAdopters.cancel')}
          </button>
          <button
            type="submit"
            className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white transition-colors"
          >
            {t('earlyAdopters.submit')}
          </button>
        </div>
      </form>
    </article>
  );
}

type EarlyAdoptersFormData = {
  email: string;
  fullName: string;
  street: string;
  city: string;
  phone: string;
  birthDate?: Date;
}

const validateEarlyAdoptersForm = (data: EarlyAdoptersFormData) => {
  return z.object({
    email: z.string().email(),
    fullName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().optional(),
    birthDate: z.date().optional(),
  }).safeParse(data);
}

export default EarlyAdoptersPopup;