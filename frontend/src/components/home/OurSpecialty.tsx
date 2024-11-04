import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetRandomRecipes } from "../../hooks/useRecipesData";
import useRandomCards from "../../hooks/useRandomCards";
import { Recipe } from "../../client";

const OurSpecialty = () => {
  const { t } = useTranslation();
  const { data: recipes } = useRandomCards<Recipe>({
    fetchHook: useGetRandomRecipes,
    dataKey: "recipes"
  })
  return (
    <section className="bg-[#D2FCFF] py-12" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-12 text-center">
          <Link to="/recipes">
            {t('homePage.ourSpecialty.title')}
          </Link>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} data={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/recipes/${data._id}`} className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10">
      <div className="aspect-w-16 aspect-h-10">
        <img src={data.image} loading="lazy" alt={data.name} className="w-full object-cover rounded-xl" />
      </div>
      <div className="flex justify-between items-end mt-4">
        <h3 className="text-xl dark:text-neutral-300 dark:group-hover:text-white text-primary font-semibold">
          {data.name}
        </h3>
        <p className="text-md text-gray-600 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
          {t('homePage.ourSpecialty.readMore')}
        </p>
      </div>
    </Link>
  );
};

export default OurSpecialty;