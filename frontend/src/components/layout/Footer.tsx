import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto bg-[#d3f5d3] w-full dark:bg-neutral-950" dir="rtl" lang="he">
      <div className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-semibold hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label={t('footer.brand')}>
              {t('footer.brand')}
            </Link>
          </div>

          <nav aria-label={t('footer.brand')}>
            <h2 className="font-semibold mb-4">{t('footer.brand')}</h2>
            <ul className="space-y-3">
              {[
                { to: "/about", label: t('footer.about') },
                { to: "/products", label: t('footer.store') },
                { to: "/recipes", label: t('footer.recipes') },
                { to: "/contact", label: t('footer.contact') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-semibold mb-4">{t('footer.subscribe.title')}</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="email-input" className="sr-only">{t('footer.subscribe.placeholder')}</label>
                <input
                  type="email"
                  id="email-input"
                  className="flex-grow py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-btnColor focus:ring-blue-500 dark:bg-neutral-900 dark:text-neutral-400"
                  placeholder={t('footer.subscribe.placeholder')}
                  required
                />
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center rounded-lg border border-transparent bg-secondary text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {t('footer.subscribe.button')}
                </button>
              </div>
              <p className="text-sm text-gray-900 dark:text-neutral-400">
                {t('footer.subscribe.description')}
              </p>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-neutral-400">
            {t('footer.rights')} {t('footer.year')}
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
interface SocialLinkProps {
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}
export default Footer;