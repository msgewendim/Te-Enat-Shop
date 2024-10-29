import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { ourTopCategories } from "../../utils/constants";
import { CategoryCardProps } from "../../providers/interface/general.props";

const OurCategory = () => {
  const { t } = useTranslation();
  const { setCategory } = useAppContext();

  return (
    <section className="bg-[#274C5B] py-16" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl text-white font-bold text-center mb-16">
          {t('homePage.ourCategory.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {ourTopCategories.map((category, index) => (
            <CategoryCard key={index} category={category} setCategory={setCategory} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard: FC<CategoryCardProps> = ({ category, setCategory }) => {
  const { name, image, value } = category;

  return (
    <Link
      to={`/products?category=${value.toLowerCase()}`}
      onClick={() => setCategory(value)}
      className="text-center group"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-md sm:text-lg font-medium text-white capitalize group-hover:underline">
        {name}
      </h3>
    </Link>
  );
};

export default OurCategory;