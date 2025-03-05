import { useTranslation } from 'react-i18next';
import { IoIosArrowRoundBack } from "react-icons/io";

const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <form>
      <div className="space-y-4">
        {/* Input Fields */}
        {[
          { id: "hs-tac-input-name", placeholder: t('contact.namePlaceholder'), label: t('contact.fullName'), type: "text" },
          { id: "hs-tac-input-email", placeholder: t('contact.emailPlaceholder'), label: t('contact.email.label'), type: "email" },
          { id: "hs-tac-input-phone", placeholder: t('contact.phonePlaceholder'), label: t('contact.phone.label'), type: "text" }
        ].map(({ id, placeholder, label, type }) => (
          <div className="relative" key={id}>
            <input
              type={type}
              id={id}
              className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2 focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
              placeholder={placeholder}
              required // Marking fields as required for better form validation
            />
            <label
              htmlFor={id}
              className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-neutral-400"
            >
              {label}
            </label>
          </div>
        ))}

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="hs-tac-message"
            className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2 focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
            placeholder={t('contact.messagePlaceholder')}
            required // Marking textarea as required for better form validation
          ></textarea>
          <label htmlFor="hs-tac-message" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400">
            {t('contact.howCanWeHelp')}
          </label>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-neutral-500">{t('contact.requiredFields')}</p>
        <p className="mt-5">
          <button
            type="submit" // Ensuring the button submits the form
            className="group inline-flex items-center gap-x-2 py-2 px-3 bg-secondary font-medium text-sm text-neutral-800 rounded-full focus:outline-btnColor2"
          >
            {t('contact.submit')}
            <IoIosArrowRoundBack />
          </button>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;