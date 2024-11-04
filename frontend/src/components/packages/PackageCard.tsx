import PackageInfo from "./PackageInfo";
import { Link } from "react-router-dom";
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { Package } from "../../client/types.gen";
import { useTranslation } from "react-i18next";

const PackageCard = ({ data }: { data: Package }) => {
  const { t } = useTranslation();
  const { price, cookingTime, image, name, peoplesQuantity, ingredientsQuantity } = data;

  return (
    <Link to="/packages" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-slate-200 transition duration-300">
      <img
        alt={name}
        src={image}
        className="h-56 w-full rounded-md object-cover"
      />
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <span className="text-sm text-gray-500">{t('homePage.productPackages.price')}: ₪{price}</span>
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
          {t('homePage.productPackages.buy')}
        </button>
        <div className="mt-6 flex items-center justify-between text-xs">
          <PackageInfo icon={TfiTimer} label={cookingTime} title={t('homePage.productPackages.cookingTime')} />
          <PackageInfo icon={BsPeople} label={peoplesQuantity} title={t('homePage.productPackages.peopleQuantity')} />
          <PackageInfo icon={PiCookingPot} label={ingredientsQuantity} title={t('homePage.productPackages.ingredientsQuantity')} />
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;