import { useTranslation } from 'react-i18next';
import RecipeCard from "../components/recipes/RecipeCard";
import Banner from "../components/ui/Banner";
import RecipesBanner from "/RecipesBanner.svg";
import { recipesList } from '../utils/examples';
import Filters from '../components/ui/Filters';

const Recipes = () => {
  const { t } = useTranslation();
  return (
    <main className="recipes-page">
      <Banner image={RecipesBanner} text={t('recipes.bannerText')} />
      <div className="container mx-auto px-4 py-8">
        <Filters type="recipes" clearFiltersPath='/recipes' />
        <section className="container mx-auto px-4 py-12" aria-label={t('recipes.sectionLabel')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipesList.map((recipe, idx) => (
              <RecipeCard
                key={idx}
                recipe={recipe}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Recipes;