import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import recipeBanner from "/RecipeBanner.svg";
import { createRecipeCardImage } from "../utils/helperFunctions";
import Banner from "../components/ui/Banner";
import RelatedItems from '../components/ui/RelatedItems';
import { RecipeInfoProps } from '../providers/interface/recipes.props';
import { useGetRecipeById } from '../hooks/useRecipesData';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/ui/Loader';
import { Ingredient, Instruction } from '../client';

const RecipePage = () => {
  const { t } = useTranslation();
  const { recipeID } = useParams();
  const { data: recipe, isError, isLoading, error } = useGetRecipeById(recipeID || "");
  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message || t('errors.genericError'));
    return null;
  }
  if (!recipe) {
    toast.error(t('errors.productNotAvailable'));
    return null;
  }
  const { name, prepTime, description, difficulty, image, ingredients, instructions, categories } = recipe;
  return (
    <article className="recipe-page" lang="he">
      <Banner image={recipeBanner} text={name} />
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="flex flex-col">
            <header>
              <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">{name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{description}</p>
            </header>

            <div className="flex justify-between mb-6">
              <RecipeInfo icon={TfiTimer} label={t('recipe.prepTime')} value={prepTime} />
              <RecipeInfo icon={PiCookingPot} label={t('recipe.difficulty')} value={difficulty} />
              <RecipeInfo icon={BsPeople} label={t('recipe.servings')} value="23" />
            </div>
            <section className="mb-6">
              <h2 className="text-xl font-bold text-primary mb-3">{t('recipe.ingredients')}</h2>
              <ul className="bg-gray-200 p-4 rounded-lg">
                {ingredients?.map((ingredient, index) => (
                  <IngredientItem key={index} {...ingredient} />
                ))}
              </ul>
            </section>
          </div>
          {/* Image */}
          <div className="lg:col-span-2">
            <div style={createRecipeCardImage(image, "100%", "60vh")} className="w-full h-[60vh] rounded-lg shadow-lg" aria-label={t('recipe.imageAlt', { name })}></div>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('recipe.instructions')}</h2>
          <ol className="space-y-4">
            {instructions?.map((instruction, index) => (
              <InstructionItem key={index} {...instruction} />
            ))}
          </ol>
        </section>
        <RelatedItems itemCategory={categories[0]} type='recipes' />
      </div>
    </article>
  );
};

const RecipeInfo: FC<RecipeInfoProps> = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-2xl text-blue-700 mb-2" />
    <span className="text-sm font-semibold">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
);

const IngredientItem = ({ name, quantity }: Ingredient) => (
  <li className="flex items-center mb-2 gap-2">
    <input
      type="checkbox"
      className={`w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 checked:line-through `}
    />
    <span className="font-semibold mr-2">{quantity}</span>
    <span>{name}</span>
  </li>
);

const InstructionItem = ({ step, description }: Instruction) => (
  <li className="pb-4 border-b border-gray-300 last:border-b-0">
    <span className="font-bold mr-4">{step}. </span>
    {description}
  </li>
);



export default RecipePage;