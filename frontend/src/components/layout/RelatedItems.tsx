import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import Loader from "../ui/Loader";
import CarouselButton from "../ui/CarouselButton";
import { RelatedItemCardProps, RelatedItemsProps } from "../../providers/interface/general.props";
import useRelatedItems from "../../hooks/app/useRelatedItems";
import { Recipe } from "../../client/types.gen";
import { Product } from "../../client/types.gen";


const RelatedItems = <T extends Recipe | Product>({
  itemCategory,
  type,
  titleKey,
  linkPrefix
}: RelatedItemsProps) => {
  const { t } = useTranslation();

  const { items, isError, isLoading, error, currentIndex, nextItems, prevItems, visibleItems, hasMore } = useRelatedItems<T>(itemCategory, type);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message);
    return null;
  }
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className="py-12" aria-labelledby="relatedItemsTitle">
      <div className="container mx-auto px-4">
        <h2 id="relatedItemsTitle" className="text-2xl font-bold text-primary mb-6">
          {t(titleKey)}
        </h2>
        <div className="flex items-center">
          <CarouselButton
            onClick={prevItems}
            disabled={currentIndex === 0}
            direction="previous"
            ariaLabel=""
            children
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            {visibleItems.map((item) => (
              <RelatedItemCard
                key={item._id}
                item={item as T}
                linkPrefix={linkPrefix}
              />
            ))}
          </div>
          <CarouselButton
            onClick={nextItems}
            disabled={!hasMore}
            direction="next"
            ariaLabel="next-button"
            children
          />
        </div>
      </div>
    </section>
  );
};

const RelatedItemCard = ({ item, linkPrefix }: RelatedItemCardProps) => {
  const { name, image, _id } = item
  return (
    <Link to={`${linkPrefix}/${_id}`} className="flex flex-col items-center group">
      <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-lg text-primary font-semibold text-center group-hover:underline">
        {name}
      </h3>
    </Link>
  );
}

export default RelatedItems;