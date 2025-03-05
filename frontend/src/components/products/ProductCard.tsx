import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import PopupProduct from "./PopupProduct";
import { Product } from "../../client/types.gen";
import { ProductImageProps } from "../../providers/interface/products.props";

const ProductCard = ({ product, className = "" }: { product: Product, className?: string }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { image, name, categories, _id, pricing, subCategories } = product;
  const categoriesInHebrew = categories.map(cat => cat.nameInHebrew);
  const subCategoriesInHebrew = subCategories?.map(subCat => subCat.nameInHebrew) || [];
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <article className={`group flex flex-col w-full max-w-[390px] bg-white shadow-xl dark:bg-emerald-900 dark:border-emerald-700 dark:shadow-lg dark:shadow-neutral-700/70 ${className}`}>
      <ProductImage image={image} name={name} onClick={handleOpenPopup} />

      <div className="px-4 py-1 flex flex-col flex-grow" dir="ltr">
        <ProductHeader name={name} price={pricing[0]?.price || 0} />
        <ProductCategories categories={categoriesInHebrew} subCategories={subCategoriesInHebrew} />
      </div>

      <ProductActions productId={_id} onAddToCart={handleOpenPopup} name={name} />

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
        loading="lazy"
        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105 dark:group-hover:scale-110 dark:shadow-neutral-700/10 dark:group-hover:shadow-neutral-700/70"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${name}`}
        aria-hidden={true}

      />
    )}
  </div>
);

const ProductHeader = ({ name, price }: { name: string, price: number }) => (
  <div className="flex justify-between items-center mb-1">
    <p className="text-gray-500 dark:text-gray-100" aria-label={`Price: ${price} shekels`}>₪{price}</p>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
      {name}
    </h3>
  </div>
);

const ProductCategories = ({ categories, subCategories }: { categories: string[], subCategories: string[] }) => (
  <div className="flex flex-wrap justify-end gap-2">
    {subCategories.map((subCat, idx) => (
      <span key={idx} className="text-xs font-normal uppercase text-red-800 dark:text-red-100">
        {subCat}
      </span>
    ))}
    {categories.map((cat, idx) => (
      <span key={idx} className="text-xs font-semibold uppercase text-blue-800 dark:text-blue-400">
        {cat}
      </span>
    ))}
  </div>
);

const ProductActions = ({ productId, onAddToCart, name }: { productId: string, name: string, onAddToCart: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
      <Link
        to={`/products/${productId}/info`}
        className="w-full py-3 px-4 inline-flex justify-center items-center text-sm font-medium bg-white text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-emerald-900 dark:text-white dark:hover:bg-emerald-800"
        aria-label={`Read more about ${name}`}
      >
        {t('product.readMore')}
      </Link>
      <button
        onClick={onAddToCart}
        className="w-full py-3 px-4 inline-flex justify-center items-center text-sm font-medium text-white bg-[#90b77d] hover:bg-[#42855b] focus:outline-none focus:ring-2 focus:ring-[#90b77d] dark:bg-emerald-900 dark:text-white dark:hover:bg-emerald-800"
        aria-label={`Add ${name} to cart`}
      >
        {t('product.addToCart')}
      </button>
    </div>
  );
};

export default ProductCard;