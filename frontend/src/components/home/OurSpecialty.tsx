import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { CgBowl } from "react-icons/cg";
import { GiFlour, GiGrainBundle } from "react-icons/gi";
import { PiGrains } from "react-icons/pi";
import { Link } from "react-router-dom";
import { recipesList } from "../../utils/examples";

const OurSpecialty = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#D2FCFF] py-12" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-12 text-center">
          {t('homePage.ourSpecialty.title')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recipesList.map(({ _id, image, name }, index) => (
            <RecipeCard key={index} id={_id} image={image} title={name} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <FeatureCard
            icon={<GiGrainBundle size={48} />}
            title={t('homePage.ourSpecialty.features.spices.title')}
            description={t('homePage.ourSpecialty.features.spices.description')}
          />
          <FeatureCard
            icon={<GiFlour size={48} />}
            title={t('homePage.ourSpecialty.features.legumes.title')}
            description={t('homePage.ourSpecialty.features.legumes.description')}
          />
          <FeatureCard
            icon={<CgBowl size={48} />}
            title={t('homePage.ourSpecialty.features.blends.title')}
            description={t('homePage.ourSpecialty.features.blends.description')}
          />
          <FeatureCard
            icon={<PiGrains size={48} />}
            title={t('homePage.ourSpecialty.features.health.title')}
            description={t('homePage.ourSpecialty.features.health.description')}
          />
        </div>
      </div>
    </section>
  );
};

const RecipeCard: FC<RecipeCardType> = ({ id, image, title }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/recipes/${id}`} className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10">
      <div className="aspect-w-16 aspect-h-10">
        <img src={image} alt={title} className="w-full object-cover rounded-xl" />
      </div>
      <div className="flex justify-between items-end mt-4">
        <h3 className="text-xl dark:text-neutral-300 dark:group-hover:text-white text-primary font-semibold">
          {title}
        </h3>
        <p className="text-md text-gray-600 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
          {t('homePage.ourSpecialty.readMore')}
        </p>
      </div>
    </Link>
  );
};

interface RecipeCardType {
  id: string;
  image: string;
  title: string;
}

const FeatureCard: FC<FeatureCardType> = ({ icon, title, description }) => (
  <div className="text-center p-4 flex flex-col items-center">
    <div className="mb-4">{icon}</div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-400">
      {description}
    </p>
  </div>
);
interface FeatureCardType {
  icon: React.ReactElement;
  title: string;
  description: string;
}
export default OurSpecialty;