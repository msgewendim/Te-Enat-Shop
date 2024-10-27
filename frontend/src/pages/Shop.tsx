import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ShopBanner from "/ShopBanner.svg";
import Cart from "./Cart";
import Loader from "../components/ui/Loader";
import Filters from "../components/ui/Filters";
import Banner from "../components/ui/Banner";
import useShop from "../hooks/useShop";
import { t } from 'i18next';

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

        <section className="my-8" aria-label={t('shop.productList')}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
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

const FloatingCartButton = ({ cartItemsCount, setOpenCart }: FloatingCartButtonProps) => (
  <button
    onClick={() => setOpenCart(true)}
    className="fixed right-2 top-16 sm:right-10 sm:top-[50vh] bg-primary rounded-full p-3 shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
    aria-label={t('shop.openCart')}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartItemsCount}
    </span>
  </button>
);

const Pagination = ({ page, handlePrevious, handleNext }: PaginationProps) => {
  const { t } = useTranslation();

  return (
    <nav className="flex justify-center items-center gap-2" aria-label={t('shop.pagination')}>
      <PaginationButton
        onClick={handlePrevious}
        direction="previous"
        ariaLabel={t('shop.previousPage')}
        page={page - 1}
      />
      <span className="px-4 py-2 rounded-md bg-gray-200 text-sm font-medium">
        {page}
      </span>
      <PaginationButton
        onClick={handleNext}
        direction="next"
        ariaLabel={t('shop.nextPage')}
        page={page + 1}
      />
    </nav>
  );
};

const PaginationButton = ({ onClick, direction, ariaLabel, page }: PaginationButtonProps) => (
  <Link
    to={`/products?page=${page}`}
    onClick={onClick}
    className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
    aria-label={ariaLabel}
  >
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points={direction === 'previous' ? "9 18 15 12 9 6" : "15 18 9 12 15 6"}></polyline>
    </svg>
  </Link>
);

type PaginationButtonProps = {
  onClick: () => void,
  direction: 'previous' | 'next',
  ariaLabel: string,
  page: number,
};

type PaginationProps = {
  page: number,
  handlePrevious: () => void,
  handleNext: () => void,
}
type FloatingCartButtonProps = {
  cartItemsCount: number,
  setOpenCart: (isOpen: boolean) => void,
}
export default Shop;