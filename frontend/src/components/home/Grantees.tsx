import { FC } from "react";
import { BsGlobe } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { GuaranteeCardProps } from "../../providers/interface/general.props";

// Grantees Cards
const Grantees = () => {
  const { t } = useTranslation();

  const guarantees = [
    { title: t('homePage.grantees.freshness.title'), text: t('homePage.grantees.freshness.text'), icon: BsGlobe },
    { title: t('homePage.grantees.support.title'), text: t('homePage.grantees.support.text'), icon: BiSupport },
    { title: t('homePage.grantees.returnPolicy.title'), text: t('homePage.grantees.returnPolicy.text'), icon: GiShoppingCart },
    { title: t('homePage.grantees.securePayment.title'), text: t('homePage.grantees.securePayment.text'), icon: FaRegCreditCard },
  ];

  return (
    <section className="py-12 dark:bg-gray-800" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="sr-only dark:text-gray-50">{t('homePage.grantees.title')}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {guarantees.map((guarantee, index) => (
            <GuaranteeCard key={index} {...guarantee} />
          ))}
        </ul>
      </div>
    </section>
  );
};


const GuaranteeCard: FC<GuaranteeCardProps> = ({ icon: Icon, text, title }) => {
  return (
    <li className="w-full max-w-[200px] dark:shadow-lg dark:shadow-gray-100/10">
      <div className="bg-white dark:bg-gray-900 h-full rounded-lg p-4 flex flex-col items-center text-center shadow-md transition-transform hover:scale-105 dark:shadow-gray-900/10">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
          <Icon className="w-6 h-6 text-primary dark:text-gray-50" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-primary mb-2 dark:text-gray-50">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
      </div>
    </li>
  );
};

export default Grantees;