import PackageInfo from "./PackageInfo";
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { Package } from "../../client/types.gen";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import PackageModal from './PackageModal';

const PackageCard = ({ data }: { data: Package }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { price, cookingTime, image, name, peoplesQuantity, ingredientsQuantity } = data;

  return (
    <>
      <section className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-slate-200 transition duration-300 dark:hover:bg-gray-800">
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
          <div className="mt-6 flex items-center justify-between text-xs">
            <PackageInfo icon={TfiTimer} label={cookingTime} title={t('homePage.productPackages.cookingTime')} />
            <PackageInfo icon={BsPeople} label={peoplesQuantity} title={t('homePage.productPackages.peopleQuantity')} />
            <PackageInfo icon={PiCookingPot} label={ingredientsQuantity} title={t('homePage.productPackages.ingredientsQuantity')} />
          </div>
          <PackageCardButtons
            setIsModalOpen={setIsModalOpen}
          />
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

const PackageCardButtons = ({setIsModalOpen}: {setIsModalOpen: (value: boolean) => void}) => {
  return (
    <div className="flex gap-2">
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"buy"} />
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"read more"} />
      <PackageCardButton setIsModalOpen={setIsModalOpen} name={"to recipe"} />
    </div>
  )
}; 

const PackageCardButton = ({setIsModalOpen, name}: {setIsModalOpen: (value: boolean) => void, name: string}) => {
  // const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={() => setIsModalOpen(true)}
      className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
      {/* {t('homePage.productPackages.button', {name})} */}
      {name}
    </button>
  )
};
export default PackageCard;