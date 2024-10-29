import { useTranslation } from 'react-i18next';
import ProductCard from "../components/products/ProductCard";
import ShopBanner from "/ShopBanner.svg";
import Cart from "./Cart";
import Loader from "../components/ui/Loader";
import Filters from "../components/ui/Filters";
import Banner from "../components/ui/Banner";
import useShop from "../hooks/useShop";
import Pagination from '../components/ui/Pagination';
import FloatingCartButton from '../components/cart/FloatingCart';

const Shop = () => {
  const { t } = useTranslation();
  const {
    cartItems,
    data,
    isLoading,
    setOpenCart,
    openCart,
    page,
    handleNext,
    handlePrevious
  } = useShop();

  if (isLoading) return <Loader />;

  return (
    <main className="shop-page">
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <FloatingCartButton cartItemsCount={cartItems.length} setOpenCart={setOpenCart} />
      <Banner image={ShopBanner} text={t('shop.title')} />

      <div className="container mx-auto px-4 py-8">
        <Filters type="products" clearFiltersPath='/products' />

        <section
          className="my-8"
          aria-label={t('shop.productList')}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {data?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <Pagination
          page={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </main>
  );
};

export default Shop;