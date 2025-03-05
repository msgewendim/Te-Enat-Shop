import { XMarkIcon } from "@heroicons/react/24/outline";
import { Path, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { z } from "zod";

import { useEarlyAdapters } from "../../../hooks/form/useFormUserData";
import { makeBreakLine } from "../../../utils/helperFunctions";
import { FormInput } from "../../ui/FormInput";
import Loader from "../../ui/Loader";
import GenericModal from "../../ui/Modal";

// Types
export type EarlyAdoptersFormData = {
  email: string;
  fullName: string;
  street: string;
  city: string;
  phone: string;
  birthDate?: Date;
}

// Validation schema
const earlyAdoptersSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(1),
  birthDate: z.date().optional(),
});

// Form component
const EarlyAdoptersForm = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<EarlyAdoptersFormData>();
  const { mutate: addEarlyAdapter, isError, isPending } = useEarlyAdapters();

  const onSubmit = (data: EarlyAdoptersFormData) => {
    const validationResult = earlyAdoptersSchema.safeParse(data);
    if (validationResult.success) {
      addEarlyAdapter(data);
      reset();
      toast.success(t('earlyAdopters.modal.success'));
    } else {
      toast.error(t('earlyAdopters.modal.validationError'));
    }
  };

  if (isError) {
    toast.error(t('earlyAdopters.modal.error'));
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 bg-gray-100 shadow-2xl rounded-2xl p-8 border border-gray-100"
    >
      <section className="grid md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.name} className="relative group">
            <FormInput
              type={field.type || "text"}
              name={field.name as Path<EarlyAdoptersFormData>}
              label={t(field.label)}
              placeholder={field.placeholder || ""}
              required={field.required}
              register={register}
              className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 placeholder-transparent"
            />
          </div>
        ))}
      </section>
      <EarlyAdoptersFormButton isPending={isPending} onClose={onClose} />
    </form>
  );
}

const formFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'street',
    label: 'Street',
    placeholder: 'Enter your street',
    required: true,
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Enter your city',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Enter your phone number',
    required: true,
  },
  {
    name: 'birthDate',
    type: 'date',
    label: 'Birth Date',
    required: false,
    placeholder : 'Enter your birth date',
  },
];

const EarlyAdoptersFormButton = ({ isPending, onClose }: { isPending: boolean, onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="grid md:grid-cols-2 gap-6">
<button
  type="button"
  onClick={onClose}
  className="w-full py-3 bg-btnColor1 text-white rounded-lg hover:bg-btnColor1/80 transition-colors"
>
  {t('earlyAdopters.modal.cancel')}
</button>
<button
  type="submit"
  disabled={isPending}
  className={`
    w-full py-3 rounded-lg text-white transition-all duration-300
    ${isPending 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-btnColor2 hover:bg-hoverBtnColor2 hover:shadow-lg'
    }
  `}
>
  {isPending ? t('earlyAdopters.modal.loading') : t('earlyAdopters.modal.submit')}
</button>
</div>
)}

// Modal component
const EarlyAdaptersPopup = ({ isPopupOpen, handleClosePopup }: { isPopupOpen: boolean, handleClosePopup: () => void }) => {
  const { t } = useTranslation();
  return (
    <GenericModal
    className="bg-gradient-to-br from-blue-50 to-purple-100"
    title={
      <div className="flex items-center justify-between text-2xl font-bold">
        <span className="text-primary text-center">{t('earlyAdopters.modal.title')}</span>
        <div className="text-gray-500 hover:text-red-500 transition-colors">
          <button onClick={handleClosePopup}>
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    }
      content={
        <article className="animate-fade-in-up space-y-6 max-h-screen overflow-y-auto">
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-md font-medium text-blue-800 text-center">
              {makeBreakLine(t('earlyAdopters.modal.message')).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </p>
          </div>
          <EarlyAdoptersForm onClose={handleClosePopup} />
        </article>
      }
      open={isPopupOpen}
      setOpen={handleClosePopup}
    />
  );
}

// // Button component
export const EarlyAdaptersPopupButton = ({ isOpen, setIsOpen } : { isOpen: boolean, setIsOpen: (value: boolean) => void }) => {
  const { t } = useTranslation();
  return (
    <section className="min-h-[100px] bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="flex flex-col justify-center items-center gap-6 py-8 px-4">
      <header className="text-center">
        <h2 className="text-lg font-bold text-white mb-4 dark:text-gray-100">
            {t('earlyAdopters.title')}
        </h2>
        <p className="text-white max-w-3xl mx-auto dark:text-gray-100">            
        {makeBreakLine(t('earlyAdopters.message')).map((paragraph, index) => (
          <span key={index}>{paragraph}</span>
        ))}
        </p>
        </header>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="rounded-full px-8 py-2 text-lg font-semibold tracking-wide bg-yellow-400 text-blue-900 transition-all duration-300 transform hover:scale-105 hover:bg-yellow-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          {t('earlyAdopters.button')}
        </button>
      </div>
    </section>
  );
}
export default EarlyAdaptersPopup;