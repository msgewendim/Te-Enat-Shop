import { BsTelephone } from "react-icons/bs";
import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import ContactForm from "../components/layout/ContactForm";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <div dir="rtl" className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10 lg:mb-14">
          <h2 className="font-semibold text-primary text-2xl md:text-4xl md:leading-tight" id="contact-heading">
            {t('contact.title')}
          </h2>
          <p className="mt-1 text-neutral-400">{t('contact.subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
          <div className="space-y-14">
            {/* Phone */}
            <div className="flex gap-x-5" aria-labelledby="phone-label">
              <BsTelephone />
              <div className="grow">
                <h4 id="phone-label" className="font-semibold text-primary">{t('contact.phone.label')}</h4>
                <a
                  className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200"
                  href="tel:+972543287837"
                >
                  {t('contact.phone.number')}
                </a>
              </div>
            </div>

            {/* Mail */}
            <div className="flex gap-x-5" aria-labelledby="email-label">
              <IoMailOpenOutline size={24} />
              <div className="grow">
                <h4 id="email-label" className="font-semibold text-primary">{t('contact.email.label')}</h4>
                <a
                  className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200"
                  href="mailto:example@site.co"
                >
                  {t('contact.email.address')}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-x-5" aria-labelledby="address-label">
              <IoLocationOutline size={24} />
              <div className="grow">
                <h4 id="address-label" className="font-semibold text-primary">{t('contact.address.label')}</h4>
                <address className="mt-1 text-neutral-400 text-sm not-italic">
                  {t('contact.address.line1')}<br />
                  {t('contact.address.city')}<br />
                  {t('contact.address.zip')}
                </address>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;