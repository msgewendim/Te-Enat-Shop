import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { RandomItem } from "../../client/types.gen";
import useRelatedItems from "../../hooks/app/useRelatedItems";
import { RelatedItemCardProps, RelatedItemsProps } from "../../providers/interface/general.props";
import CarouselButton from "../ui/CarouselButton";
import Loader from "../ui/Loader";


const RelatedItems = ({
  endpoint,
  itemCategory,
  titleKey,
  exclude,
}: RelatedItemsProps) => {
  const { t } = useTranslation();

  const { visibleItems, isError, isLoading, error, currentIndex, nextItems, prevItems, hasMore, items } = useRelatedItems(endpoint, itemCategory, exclude);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message);
    return null;
  }
  if (!visibleItems || visibleItems.length === 0) {
    return null;
  }
  return (
    <>
      {items.length > 0 && (
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
              />
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow`}>
                {visibleItems.map((item) => (
                  <RelatedItemCard
                    key={item._id}
                    item={item}
                    endpoint={endpoint}
                  />
                ))}
              </div>
              <CarouselButton
                onClick={nextItems}
                disabled={!hasMore}
                direction="next"
                ariaLabel="next-button"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const RelatedItemCard = ({ item, endpoint }: RelatedItemCardProps<RandomItem>) => {
  const { name, image, _id } = item
  return (
    <Link to={`${endpoint}/${_id}`} className="flex flex-col items-center group">
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