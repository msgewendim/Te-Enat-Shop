import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPeople } from "react-icons/bs";
import { PiCookingPot } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";

import recipeBanner from "../../public/RecipeBanner.svg";

import { toast } from 'react-toastify';

import { Ingredient, Instruction, Product } from '../client/types.gen';
import RelatedItems from '../components/layout/RelatedItems';
import PopupProduct from '../components/products/PopupProduct';
import Banner from "../components/ui/Banner";
import Loader from '../components/ui/Loader';
import useRecipePage from '../hooks/recipe/useRecipeData';
import { RecipeInfoProps } from '../providers/interface/recipes.props';
import { createRecipeCardImage } from "../utils/helperFunctions";

const RecipePage = () => {
  const { t } = useTranslation();
  const { recipe, productsFromRecipe, handleAddAllProductsToCart, isLoadingGettingRecipe, isErrorGettingRecipe, isErrorProductsFromRecipe, errorGettingRecipe, errorProductsFromRecipe } = useRecipePage();

  if (isLoadingGettingRecipe) return <Loader />;
  if (isErrorGettingRecipe || isErrorProductsFromRecipe) {
    toast.error(errorGettingRecipe?.message || errorProductsFromRecipe?.message || t('errors.genericError'));
    return null;
  }
  const { name, prepTime, description, difficulty, image, ingredients, instructions, categories, _id } = recipe;


  return (
    <article className="recipe-page" lang="he">
      <Banner image={recipeBanner} text={name} />
      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Right Side: Name, Ingredients, Products, Instructions */}
        <div className="lg:col-span-1">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">{name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          </header>
          {/* Ingredients */}
          <IngredientsFromRecipe ingredients={ingredients} />
          {/* Products from Recipe */}
          <ProductsFromRecipe products={productsFromRecipe || []} handleAddAllProductsToCart={handleAddAllProductsToCart} />
        </div>
        {/* Left Side: Image and Recipe Info */}
        <div className="flex flex-col lg:col-span-2 gap-2 items-center">
          <div style={createRecipeCardImage(image, "100%", "60vh")} className="w-full h-[60vh] rounded-lg shadow-lg mb-6" aria-label={t('recipe.imageAlt', { name })}></div>
          <div className="flex mb-6 gap-24">
            <RecipeInfo icon={TfiTimer} label={t('recipe.prepTime')} value={prepTime} />
            <RecipeInfo icon={PiCookingPot} label={t('recipe.difficulty')} value={difficulty} />
            <RecipeInfo icon={BsPeople} label={t('recipe.servings')} value="23" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="lg:col-span-2 w-full">
        <InstructionsFromRecipe instructions={instructions} />
        {/* Related Recipes */}
        <RelatedItems
          exclude={_id}
          endpoint='/recipes'
          itemCategory={categories[0]?.nameInEnglish || ''}
          titleKey='relatedRecipes.title'
        />
      </div>
    </article>
  );
};


const ProductsFromRecipe = ({ products, handleAddAllProductsToCart }: { products: Product[], handleAddAllProductsToCart: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      {products &&
        <section className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-1">{t('recipe.productsFromRecipe')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('recipe.chooseAllOrSome')}</p>
          <ul className="space-y-4 mb-4">
            {products.map((product, index) => (
              <ProductItemFromRecipe key={index} product={product} />
            ))}
          </ul>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleAddAllProductsToCart}>{t('buttons.buy')}</button>
        </section>
      }
    </>
  );
};

const ProductItemFromRecipe = ({ product }: { product: Product }) => {
  const { name, image, pricing } = product;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenProductModal = () => setIsPopupOpen(true);
  const handleCloseProductModal = () => setIsPopupOpen(false);

  return (
    <>
      <div className="flex items-end gap-2 cursor-pointer" onClick={handleOpenProductModal}>
        <img src={image} alt={name} className="w-16 h-16 rounded-lg" />
        <span>{name}</span>
        <span className="font-semibold mr-2">{pricing[0]?.price || 0 + "₪"}</span>
      </div>
      <PopupProduct
        product={product}
        open={isPopupOpen}
        setOpen={handleCloseProductModal}
      />
    </>
  );
};


const InstructionsFromRecipe = ({ instructions }: { instructions: Instruction[] }) => {
  const { t } = useTranslation();
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-primary mb-3">{t('recipe.instructions')}</h2>
      <ol className="space-y-4">
        {instructions?.map((instruction, index) => (
          <InstructionItem key={index} {...instruction} />
        ))}
      </ol>
    </section>
  );
};

const IngredientsFromRecipe = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const { t } = useTranslation();
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-primary mb-3">{t('recipe.ingredients')}</h2>
      <ul className="bg-gray-200 p-4 rounded-lg">
        {ingredients?.map((ingredient, index) => (
          <IngredientItem key={index} {...ingredient} />
        ))}
      </ul>
    </section>
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
  <li className="flex items-center gap-2">
    <input
      type="checkbox"
      className={`w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 checked:line-through checked:text-gray-500 checked:line-through-2`}
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