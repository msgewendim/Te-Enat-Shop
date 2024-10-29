import { FC } from "react";
import { menu } from "../../utils/data";
import { useTranslation } from "react-i18next";
import { Feature } from "../../client";

const WhoAreWe = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#D2FCFF] py-12" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-normal font-['Yellowtail'] italic text-emerald-900 mb-6">
          {t('homePage.whoAreWe.title')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-8">
          <TextSection />
          <ImageSection />
        </div>
      </div>
    </section>
  );
};

const TextSection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 space-y-6">
      <h3 className="font-bold text-3xl sm:text-4xl text-primary">
        {t('homePage.whoAreWe.mainHeading')}
      </h3>
      <p className="max-w-2xl">
        {t('homePage.whoAreWe.description')}
      </p>
      <Features
        title={t('homePage.whoAreWe.naturalProducts.title')}
        description={t('homePage.whoAreWe.naturalProducts.description')}
      />
      <Features
        title={t('homePage.whoAreWe.healthyProducts.title')}
        description={t('homePage.whoAreWe.healthyProducts.description')}
      />
    </div>
  );
};

const Features: FC<Feature> = ({ title, description }) => {
  return (
    <div className="space-y-2">
      <span className="inline-block py-2 px-4 bg-gray-200 rounded-full text-primary font-medium">
        {title}
      </span>
      <p className="max-w-2xl">{description}</p>
    </div>
  );
};

const ImageSection = () => {
  return (
    <div className="flex-1">
      <img src={menu} alt="תמונה המציגה את המוצרים שלנו" className="w-full max-w-2xl mx-auto" />
    </div>
  );
};

export default WhoAreWe;