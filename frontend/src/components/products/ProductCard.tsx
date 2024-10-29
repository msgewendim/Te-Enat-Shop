import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import PopupProduct from "./PopupProduct";
import { Product } from "../../client/types.gen";
import { translateProductCategories } from "../../utils/constants";
import { ProductImageProps } from "../../providers/interface/products.props";

const ProductCard = ({ product, className = "" }: { product: Product, className?: string }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { image, name, categories: englishCategories, _id, pricing } = product;
  const categories = translateProductCategories(englishCategories)

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <article className={`group flex flex-col w-full max-w-[390px] bg-white shadow-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 ${className}`}>
      <ProductImage image={image} name={name} onClick={handleOpenPopup} />

      <div className="px-4 py-1 flex flex-col flex-grow" dir="ltr">
        <ProductHeader name={name} price={pricing[0].price} />
        <ProductCategories categories={categories as string[]} />
      </div>

      <ProductActions productId={_id} onAddToCart={handleOpenPopup} />

      <PopupProduct
        product={product}
        open={isPopupOpen}
        setOpen={handleClosePopup}
      />
    </article>
  );
};

const ProductImage = ({ image, name, onClick }: ProductImageProps) => (
  <div className="h-[300px] overflow-hidden">
    {image && (
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${name}`}
      />
    )}
  </div>
);

const ProductHeader = ({ name, price }: { name: string, price: number }) => (
  <div className="flex justify-between items-center mb-1">
    <p className="text-gray-500 dark:text-neutral-500" aria-label={`Price: ${price} shekels`}>₪{price}</p>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-white">
      {name}
    </h3>
  </div>
);

const ProductCategories = ({ categories }: { categories: string[] }) => (
  <div className="flex flex-wrap justify-end gap-2">
    {categories.map((cat, idx) => (
      <span key={idx} className="text-xs font-semibold uppercase text-blue-800 dark:text-blue-500">
        {cat}
      </span>
    ))}
  </div>
);

const ProductActions = ({ productId, onAddToCart }: { productId: string, onAddToCart: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
      <Link
        to={`/products/${productId}/info`}
        className="w-full py-3 px-4 inline-flex justify-center items-center text-sm font-medium bg-white text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
        aria-label={`Read more about ${name}`}
      >
        {t('product.readMore')}
      </Link>
      <button
        onClick={onAddToCart}
        className="w-full py-3 px-4 inline-flex justify-center items-center text-sm font-medium text-white bg-[#90b77d] hover:bg-[#42855b] focus:outline-none focus:ring-2 focus:ring-[#90b77d] dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
        aria-label={`Add ${name} to cart`}
      >
        {t('product.addToCart')}
      </button>
    </div>
  );
};

export default ProductCard;