import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { BsPeople } from "react-icons/bs";
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { Link } from "react-router-dom";

import PackageInfo from "./PackageInfo";
import PackageModal from './PackageModal';
import { Package } from "../../client/types.gen";

const PackageCard = ({ data }: { data: Package }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { price, cookingTime, image, name, peoplesQuantity, ingredientsQuantity } = data;

  return (
    <>
      <section onClick={() => setIsModalOpen(true)} className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-slate-200 transition duration-300 dark:hover:bg-gray-800">
        <img
          alt={name}
          src={image}
          className="h-56 w-full rounded-md object-cover dark:shadow-gray-900/10"
        />
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg dark:text-gray-50">{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('homePage.productPackages.price')}: ₪{price}</span>
          </div>
          <div className="mt-6 mb-4 flex items-center justify-between text-xs">
            <PackageInfo icon={TfiTimer} label={cookingTime} title={t('homePage.productPackages.cookingTime')} />
            <PackageInfo icon={BsPeople} label={peoplesQuantity} title={t('homePage.productPackages.peopleQuantity')} />
            <PackageInfo icon={PiCookingPot} label={ingredientsQuantity} title={t('homePage.productPackages.ingredientsQuantity')} />
          </div>

          <PackageCardButton variant="primary" setIsModalOpen={setIsModalOpen} name={"buy"} />
        </div>
      </section>

      <PackageModal
        package={data}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
    </>
  );
};

export const PackageCardButtons = ({setIsModalOpen, _id}: {setIsModalOpen: (value: boolean) => void, _id: string}) => {
  return (
    <div className="flex w-full justify-between gap-2">
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"buy"} variant="primary" />
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"toRecipe"} variant="secondary" link={`/recipes/${name}`} />
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"readMore"} variant="tertiary" link={`/packages/${_id}/info`} />
    </div>
  )
}; 

export const PackageCardButton = ({setIsModalOpen, name, variant, link}: {setIsModalOpen: (value: boolean) => void, name: string, variant: "primary" | "secondary" | "tertiary", link?: string}) => {
  const { t } = useTranslation();
  const buttonClasses = `flex-1 min-w-[120px] w-full ${
    variant === "primary" 
      ? "bg-primary/90 text-white" 
      : variant === "secondary" 
        ? "bg-secondary/90 text-white" 
        : "border border-primary text-gray-900"
  } py-2 rounded-md transition duration-300`;

  if (link) {
    return (
      <Link to={link} className="flex-1">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={buttonClasses}>
          {t(`homePage.productPackages.${name}`)}
        </button>
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setIsModalOpen(true)}
      className={buttonClasses}>
      {t(`homePage.productPackages.${name}`)}
    </button>
  )
};
export default PackageCard;