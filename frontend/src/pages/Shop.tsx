import { useTranslation } from 'react-i18next';

import ProductCard from "../components/products/ProductCard";

import ShopBanner from "/ShopBanner.svg";

import Banner from "../components/ui/Banner";
import Filters from "../components/ui/Filters";
import Loader from "../components/ui/Loader";
import Pagination from '../components/ui/Pagination';
import useShop from "../hooks/product/useShop";

const Shop = () => {
  const { t } = useTranslation();
  const {
    products,
    isLoading,
    page,
    handleNext,
    handlePrevious
  } = useShop({ limit: 9 });

  if (isLoading) return <Loader />;

  return (
    <main className="shop-page">
      <Banner image={ShopBanner} text={t('shop.title')} />

      <div className="container mx-auto px-4 py-8 sm:max-w-[78svw]">
        <Filters type="product" clearFiltersPath='/products' />

        <section
          className="my-8"
          aria-label={t('shop.productList')}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <Pagination
          page={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          path="products"
        />
      </div>
    </main>
  );
};

export default Shop;