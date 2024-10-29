import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetRandomProducts } from "../../hooks/useProductsData";
import Loader from "../ui/Loader";
import ProductCard from "./ProductCard";
import { randomizeArray } from "../../utils/helperFunctions";
import { CarouselButtonProps } from "../../providers/interface/general.props";

const TopProducts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const limit = isMobile ? 1 : 3;
  const { data, isError, isLoading, error } = useGetRandomProducts({
    page: page,
    limit: limit
  });

  const randomizedProducts = randomizeArray(data?.products || []);

  if (isError) toast.error(error.message);

  const handlePrevious = () => setPage((old) => Math.max(old - 1, 1));
  const handleNext = () => setPage((old) => (data?.totalPages && old < data.totalPages ? old + 1 : old));

  return (
    <section className="bg-[#F9F8F8] py-12" lang="he">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {t('homePage.topProducts.title')}
          </h2>
          <p className="text-primary max-w-3xl mx-auto">
            {t('homePage.topProducts.description')}
          </p>
        </header>

        <div className="relative">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex justify-center items-center gap-10 my-5">
              {randomizedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <CarouselButton
            onClick={handlePrevious}
            disabled={page === 1}
            direction="previous"
            ariaLabel={t('homePage.topProducts.previous')}
          >
            <IoIosArrowBack />
          </CarouselButton>

          <CarouselButton
            onClick={handleNext}
            disabled={page === data?.totalPages}
            direction="next"
            ariaLabel={t('homePage.topProducts.next')}
          >
            <IoIosArrowForward />
          </CarouselButton>
        </div>
      </div>
    </section>
  );
};

const CarouselButton: FC<CarouselButtonProps> = ({ onClick, disabled, direction, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 ${direction === 'previous' ? 'left-0' : 'right-0'} z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
    aria-label={ariaLabel}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-secondary_btn group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      {children}
    </span>
  </button>
);

export default TopProducts;