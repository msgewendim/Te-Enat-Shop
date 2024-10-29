import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import Loader from "../ui/Loader";
import { FC, useState } from "react";
import { useGetRelatedItems } from "../../hooks/useProductsData";
import CarouselButton from "./CarouselButton";
import { RelatedItemsProps, RelatedItemCardProps } from "../../providers/interface/general.props";

const RelatedItems: FC<RelatedItemsProps> = ({
  itemCategory,
  type
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4
  const { data: items, isError, isLoading, error } = useGetRelatedItems({
    category: itemCategory,
    type: type,
    limit: itemsPerPage
  });
  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error.message);
    return null;
  }
  if (!items || items.length === 0) {
    return null;
  }

  const titleKey = type === 'products' ? 'relatedProducts.title' : 'relatedRecipes.title';
  const linkPrefix = type === 'products' ? '/products' : '/recipes';
  const nextItems = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, items.length - itemsPerPage)
    );
  };

  const prevItems = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);
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
            direction="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            {visibleItems.map((item) => (
              <RelatedItemCard
                key={item._id}
                item={item}
                linkPrefix={linkPrefix}
              />
            ))}
          </div>
          <CarouselButton
            onClick={nextItems}
            disabled={currentIndex + itemsPerPage >= items.length}
            direction="right"
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