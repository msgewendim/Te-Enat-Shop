import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { FormInput } from "../components/ui/FormInput";


const Events = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    const validationResult = validateEventForm(data);
    if (validationResult.success) {
      console.log(data);
      // Display a success message or redirect
    } else {
      console.log(validationResult.error.errors);
    }
  };

  return (
    <div className="mx-auto w-full mt-20 px-4 sm:px-6 lg:px-8" id="events">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">{t('events.title')}</h1>
      {isSubmitSuccessful && <p className="text-green-600 dark:text-green-400 text-center mb-4">{t('events.successMessage')}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg" aria-labelledby="events-form">
        <section aria-labelledby="event-details-heading">
          <h3 id="event-details-heading" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {t('events.details')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput<EventFormData>
              placeholder={t('events.name')}
              label={t('events.name')}
              register={register}
              name="name"
              required
              error={errors.name?.message}
            />
            <FormInput<EventFormData>
              type="email"
              placeholder={t('events.email')}
              label={t('events.email')}
              register={register}
              name="email"
              required
              error={errors.email?.message}
            />
            <FormInput<EventFormData>
              placeholder={t('events.company')}
              label={t('events.company')}
              register={register}
              name="company"
            />
            <FormInput<EventFormData>
              type="date"
              placeholder={t('events.eventDate')}
              label={t('events.eventDate')}
              register={register}
              name="eventDate"
              required
              error={errors.eventDate?.message}
            />
            <textarea
              className="w-full col-span-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor2 focus:border-transparent"
              placeholder={t('events.eventDescription')}
              {...register("eventDescription")}
              required
              rows={4}
            />
          </div>
        </section>
        <button type="submit" className="w-full py-3 mt-6 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50">{t('events.submit')}</button>
      </form>
    </div>
  );
};

type EventFormData = {
  name: string;
  email: string;
  company?: string;
  eventDescription: string;
  eventDate: Date;
}

const validateEventForm = (data: EventFormData) => {
  return z.object({
    name: z.string().min(1),
    email: z.string().email(),
    company: z.string().optional(),
    eventDescription: z.string().min(1),
    eventDate: z.date(),
  }).safeParse(data);
}

export default Events;
