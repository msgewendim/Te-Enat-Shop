import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/ui/FormInput";
import { z } from "zod";

const Events = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    const validationResult = validateEventForm(data);
    if (validationResult.success) {
      console.log(data);
    } else {
      console.log(validationResult.error.errors);
    }
  };

  return (
    <div className="mx-auto w-full mt-20" id="events">
      <h1>{t('events.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8 max-w-3xl mx-auto">
        <section aria-labelledby="event-details-heading">
          <h3 id="event-details-heading" className="text-lg font-semibold text-gray-800 mb-4">
            {t('events.details')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput<EventFormData>
              placeholder={t('events.name')}
              label={t('events.name')}
              register={register}
              name="name"
              required
            />
            <FormInput<EventFormData>
              type="email"
              placeholder={t('events.email')}
              label={t('events.email')}
              register={register}
              name="email"
              required
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
            />
          </div>
          <textarea
            placeholder={t('events.eventDescription')}
            {...register('eventDescription')}
            name="eventDescription"
            required
            className="w-full mt-4 bg-gray-100 h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnColor2"
          />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            type="submit"
            className="rounded-md px-6 py-3 w-full text-sm font-medium tracking-wide bg-btnColor2 hover:bg-hoverBtnColor2 text-white transition-colors"
          >
            {t('events.submit')}
          </button>
        </div>
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
