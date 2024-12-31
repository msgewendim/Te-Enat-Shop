import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { createRecipeCardImage } from "../../utils/helperFunctions";
import { Recipe } from '../../client/types.gen';
import { DateBadgeProps } from '../../providers/interface/general.props';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { image } = recipe;
  const createdAtDate = new Date(2013, 12, 12);
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(createdAtDate);
  const day = createdAtDate.getDate();

  return (
    <article className="relative overflow-hidden rounded-lg shadow-lg h-[300px]">
      <div style={createRecipeCardImage(image)} className="w-full h-full">
        <DateBadge day={day} month={monthName} />
        <RecipeInfo recipe={recipe} />
      </div>
    </article>
  );
};

const DateBadge = ({ day, month }: DateBadgeProps) => (
  <div className="absolute top-3 left-10 bg-primary text-white text-center py-2 px-4 rounded-full">
    <p className="text-sm font-bold">{day}</p>
    <p className="text-xs">{month}</p>
  </div>
);

const RecipeInfo = ({ recipe }: { recipe: Recipe }) => {
  const { t } = useTranslation();
  const { description, name, _id: recipeId } = recipe;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-60 p-4">
      <h3 className="text-3xl font-semibold text-primary mb-2">{name}</h3>
      <div className="flex justify-between items-start ml-6">
        <p className="text-md font-normal line-clamp-1 flex-grow">{description}</p>
        <Link
          to={`/recipes/${recipeId}`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-colors hover:from-secondary hover:to-primary"
        >
          {t('recipe.readMore')}
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
