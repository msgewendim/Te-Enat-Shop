import { useTranslation } from 'react-i18next';
import RecipeCard from "../components/recipes/RecipeCard";
import Banner from "../components/ui/Banner";
import RecipesBanner from "/RecipesBanner.svg";
import Filters from '../components/ui/Filters';
import useRecipes from '../hooks/recipe/useRecipes';
import Pagination from '../components/ui/Pagination';
import Loader from '../components/ui/Loader';

const Recipes = () => {
  const { t } = useTranslation();
  const { recipes, page, handleNext, handlePrevious, isLoading } = useRecipes({ limit: 9 })

  if (isLoading) return <Loader />;

  return (
    <main className="recipes-page">
      <Banner image={RecipesBanner} text={t('recipes.bannerText')} />
      <div className="container mx-auto px-4 py-8">
        <Filters type="recipes" clearFiltersPath='/recipes' />
        <section className="container mx-auto px-4 py-12" aria-label={t('recipes.sectionLabel')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes?.map((recipe, idx) => (
              <RecipeCard
                key={idx}
                recipe={recipe}
              />
            ))}
          </div>
        </section>
        <Pagination
          page={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          path="recipes"
        />
      </div>
    </main>
  );
};

export default Recipes;