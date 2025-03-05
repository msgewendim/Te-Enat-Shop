import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Recipe } from "../../client";
import useRandomCards from "../../hooks/app/useRandomCards";
// import RecipeCardModal from "../ui/RecipeCardModal"; 
import { makeBreakLine } from "../../utils/helperFunctions";
import CustomLink from "../ui/Link";
import Loader from "../ui/Loader";
import GenericModal from "../ui/Modal";

const OurSpecialty = () => {
  const { t } = useTranslation();
  const { data: recipes, isLoading } = useRandomCards<Recipe>({
    endpoint: '/recipes/random',
  })

  return (
    <section className="bg-[#D2FCFF] dark:bg-gray-800 py-12" lang="he">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-4 dark:text-gray-100">
            <Link to="/recipes" className="cursor-pointer">
            {t('homePage.ourSpecialty.title')}
            </Link>
          </h2>
          <p className="text-primary max-w-3xl mx-auto dark:text-gray-100">
            
            {makeBreakLine(t('homePage.ourSpecialty.description')).map((paragraph, index) => (
              <span key={index}>{paragraph}</span>
            ))}
          </p>
        </header>
        <div className="relative">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex justify-center items-center gap-10 my-5">
              {recipes?.map((recipe, index) => (
            <RecipeCard key={index} data={recipe} />
          ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
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
        <Link to={`/recipes/${data._id}`} className="text-md ml-5 text-gray-600 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
          {t('homePage.ourSpecialty.readMore')}
        </Link>
      </div>
      <RecipeCardModal recipe={data} open={isPopupOpen} setOpen={handleClosePopup} />
    </div>
  );
};

const RecipeCardModal = ({ recipe, open, setOpen }: { recipe: Recipe, open: boolean, setOpen: (open: boolean) => void }) => {
  return (
    <GenericModal open={open} setOpen={setOpen} title={
    <div className="flex items-center justify-between text-2xl font-bold">
        <span className="text-primary text-center">{recipe.name}</span>
      <div className="text-gray-500 hover:text-red-500 transition-colors">
        <button onClick={() => setOpen(false)}>
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
    } 
    titleClassName="text-2xl text-center font-semibold text-primary" 
    content={<RecipeCardModalContent recipe={recipe} />} />
  );
}

const RecipeCardModalContent = ({ recipe }: { recipe: Recipe }) => {
  const { t } = useTranslation();
  return (
  <div className="p-5 flex flex-col items-center justify-center max-h-[500px]">
    <img src={recipe.image} alt={recipe.name} className="h-[300px] w-screen object-cover rounded-xl" />
    <p className="mt-4">{recipe.description}</p>
    <CustomLink to={`/recipes/${recipe._id}`} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-colors hover:from-secondary hover:to-primary mt-4">
      {t('homePage.ourSpecialty.readMore')}
    </CustomLink>
  </div>
);
}
export default OurSpecialty;