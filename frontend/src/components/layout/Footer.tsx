import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useNewsletter } from "../../hooks/form/useFormUserData";
import { NewsLetterData } from "../../providers/api";
import { SocialLinkProps } from "../../providers/interface/general.props";
import { FormInput } from "../ui/FormInput";
import Loader from "../ui/Loader";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const FooterItems = [
    { to: "/about", label: t('footer.about') },
    { to: "/products", label: t('footer.store') },
    { to: "/recipes", label: t('footer.recipes') },
    { to: "/contact", label: t('footer.contact') },
    { to: "/events", label: t('footer.events') },
  ]
  const PrivacyItems = [
    { to: "/privacy", label: t('footer.infoAndPrivacy.privacy') },
    { to: "/terms", label: t('footer.infoAndPrivacy.terms') },
  ]


  const handleNavigate = (to: string) => {
    navigate(to);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="mt-auto bg-[#d3f5d3] w-full dark:bg-gray-900" lang="he">
      <div className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <nav aria-label={t('footer.brand')}>
            <Link to="/" className="text-xl mb-4 font-semibold hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-gray-50 dark:hover:text-gray-400" aria-label={t('footer.brand')}>
              {t('footer.brand')}
            </Link>
            <ul className="space-y-3">
              {FooterItems.map((link) => (
                <li key={link.to}>
                  <button onClick={() => handleNavigate(link.to)} className="text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-200">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.infoAndPrivacy.info')}>
            <h2 className="font-semibold mb-4 dark:text-gray-50">{t('footer.infoAndPrivacy.info')}</h2>
            <ul className="space-y-3">
              {PrivacyItems.map((link) => (
                <li key={link.to}>
                  <button onClick={() => handleNavigate(link.to)} className="text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-200">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-semibold mb-4 dark:text-gray-50">{t('footer.subscribe.title')}</h2>
            <FooterForm />
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-neutral-400">
            {t('footer.infoAndPrivacy.rights')} {t('footer.infoAndPrivacy.year')}
          </p>
          <div className="flex space-x-4 gap-2 mt-4 sm:mt-0">
            <SocialLink href="#" icon={FaFacebook} label="Facebook" />
            <SocialLink href="#" icon={SlSocialInstagram} label="Instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <Link
    to={href}
    className="text-gray-900 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-200"
    aria-label={label}
  >
    <Icon />
  </Link>
);

const FooterForm = () => {
  const { t } = useTranslation()
  const NewsLetterSchema = z.object({
    fullName: z.string().min(3, { message: t('footer.subscribe.errors.name') }),
    email: z.string().email({ message: t('footer.subscribe.errors.email') }),
    city: z.string().min(3, { message: t('footer.subscribe.errors.city') }),
  });
  const {mutate: addNewsletter, isError , isPending} = useNewsletter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsLetterData>({
    defaultValues: {
      fullName: '',
      email: '',
      city: '',
    },
    resolver: zodResolver(NewsLetterSchema),
  });

  const onSubmit = async (data: NewsLetterData) => {
    addNewsletter(data)
    reset();
    toast.success(t('footer.subscribe.success'));
  };

  if (isError) {
    toast.error(t('footer.subscribe.error'));
  }

  if (isPending) {  
    return <Loader/>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="w-full sm:w-1/2">
            <label htmlFor="name-input" className="sr-only">{t('footer.subscribe.name')}</label>
            <FormInput
              type="text"
              name="fullName"
              register={register}
              placeholder={t('footer.subscribe.name')}
              className="w-full py-3 px-4 block border-transparent rounded-lg text-sm focus:border-btnColor focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              required
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="city-input" className="sr-only">{t('footer.subscribe.city')}</label>
            <FormInput
              type="text"
              name="city"
              register={register}
              className="w-full py-3 px-4 block border-transparent rounded-lg text-sm focus:border-btnColor focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder={t('footer.subscribe.city')}
              required
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="email-input" className="sr-only">{t('footer.subscribe.email')}</label>
          <FormInput
            type="email"
            name="email"
            register={register}
            className="flex-grow py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-btnColor focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            placeholder={t('footer.subscribe.email')}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="py-3 px-4 inline-flex justify-center items-center rounded-lg border border-transparent bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {t('footer.subscribe.button')}
        </button>
      </div>
      <p className="text-sm text-gray-900 dark:text-neutral-400">
        {t('footer.subscribe.description')}
      </p>
    </form>
  )
};
export default Footer;