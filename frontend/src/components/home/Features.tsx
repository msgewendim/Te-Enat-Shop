import { CgBowl } from "react-icons/cg";
import { GiFlour, GiGrainBundle } from "react-icons/gi";
import { PiGrains } from "react-icons/pi";
import { FeatureCardType } from "../../providers/interface/general.props";
import { FC } from "react";
import { useTranslation } from "react-i18next";

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

const Features = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#D2FCFF]">
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
  )
}

export default Features;