import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Recipe } from "../../client";
import useRandomCards from "../../hooks/app/useRandomCards";
import RecipeCardModal from "../ui/RecipeCardModal";
import { useState } from "react";

const OurSpecialty = () => {
  const { t } = useTranslation();
  const { data: recipes } = useRandomCards<Recipe>({
    endpoint: '/recipes/random',
  })

  return (
    <section className="bg-[#D2FCFF] dark:bg-gray-800 py-12" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary dark:text-gray-50 mb-12 text-center">
          <Link to="/recipes">
            {t('homePage.ourSpecialty.title')}
          </Link>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recipes?.map((recipe, index) => (
            <RecipeCard key={index} data={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  return (
    <div className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10" onClick={handleOpenPopup}>
      <div className="aspect-w-16 aspect-h-10">
        <img src={data.image} loading="lazy" alt={data.name} className="w-full object-cover rounded-xl" />
      </div>
      <div className="flex justify-between items-end mt-4">
        <h3 className="text-xl dark:text-neutral-300 dark:group-hover:text-white text-primary font-semibold">
          {data.name}
        </h3>
        <p className="text-md ml-5 text-gray-600 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
          {t('homePage.ourSpecialty.readMore')}
        </p>
      </div>
      <RecipeCardModal recipe={data} open={isPopupOpen} setOpen={handleClosePopup} />
    </div>
  );
};

export default OurSpecialty;