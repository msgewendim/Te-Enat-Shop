import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { shiro } from "../../utils/data";

const packages = [
  {
    _id: '1',
    title: 'מתכון קצר',
    image: shiro,
    price: 10,
    cookingTime: 5,
    ingredientsQuantity: 20,
    peoplesQuantity: 50
  },
  {
    _id: '2',
    title: 'מתכון סופי',
    image: shiro,
    price: 20,
    cookingTime: 10,
    ingredientsQuantity: 30,
    peoplesQuantity: 75
  },
  {
    _id: '3',
    title: 'מתכון ממוקד',
    image: shiro,
    price: 30,
    cookingTime: 15,
    ingredientsQuantity: 40,
    peoplesQuantity: 100
  }
];

const ProductPackages = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#D2FCFF] py-16" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          {t('homePage.productPackages.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pac => (
            <PackageCard key={pac._id} data={pac} />
          ))}
        </div>
      </div>
    </section>
  );
};

type Package = {
  _id: string;
  title: string;
  image: string;
  price: number;
  cookingTime: number;
  ingredientsQuantity: number;
  peoplesQuantity: number;
};

const PackageCard = ({ data }: { data: Package }) => {
  const { t } = useTranslation();
  const { price, cookingTime, image, title, peoplesQuantity, ingredientsQuantity } = data;

  return (
    <Link to="/" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-slate-200 transition duration-300">
      <img
        alt={title}
        src={image}
        className="h-56 w-full rounded-md object-cover"
      />
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
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

export const PackageInfo = ({ icon: Icon, title, label }: { icon: IconType, title: string, label: number | string }) => {
  return (
    <div className="flex flex-col items-center">
      <Icon size={24} className="text-primary mb-1" />
      <p className="text-gray-500">{title}</p>
      <p className="font-medium">{label}</p>
    </div>
  );
};

export default ProductPackages;