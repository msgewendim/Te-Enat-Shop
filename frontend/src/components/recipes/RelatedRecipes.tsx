import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Recipe } from "../../client/types.gen";

import { cookies } from '../../utils/data';

const RelatedRecipes = ({ relatedRecipes }: { relatedRecipes: Partial<Recipe>[] }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const recipesPerPage = 4;

  const nextRecipes = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + recipesPerPage, relatedRecipes.length - recipesPerPage)
    );
  };

  const prevRecipes = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - recipesPerPage, 0));
  };

  const visibleRecipes = relatedRecipes.slice(currentIndex, currentIndex + recipesPerPage);

  return (
    <section className="py-12" aria-labelledby="relatedRecipesTitle">
      <div className="container mx-auto px-4">
        <h2 id="relatedRecipesTitle" className="text-2xl font-bold text-primary mb-6">
          {t('relatedRecipes.title')}
        </h2>
        <div className="flex items-center">
          <CarouselButton
            onClick={prevRecipes}
            disabled={currentIndex === 0}
            direction="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
          <CarouselButton
            onClick={nextRecipes}
            disabled={currentIndex + recipesPerPage >= relatedRecipes.length}
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

const RecipeCard = ({ recipe }: { recipe: Partial<Recipe> }) => {
  const { _id, name, image } = recipe;
  return (
    <Link to={`/recipes/${_id}`} className="flex flex-col items-center group">
      <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg">
        <img
          src={image || cookies}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-lg text-primary font-semibold text-center group-hover:underline">
        {name}
      </h3>
    </Link>
  );
};


export default RelatedRecipes;