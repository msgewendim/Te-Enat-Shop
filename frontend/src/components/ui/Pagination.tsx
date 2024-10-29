import { Link } from "react-router-dom";
import { PaginationButtonProps, PaginationProps } from "../../providers/interface/general.props";
import { useTranslation } from "react-i18next";

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

export default Pagination;