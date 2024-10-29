import { ChangeEvent, FC } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import Categories from "./Categories";
import { productCategoriesMapping, recipeCategoriesMapping } from "../../utils/constants";
import { ClearFiltersButtonProps, FiltersProps } from "../../providers/interface/general.props";


const Filters: FC<FiltersProps> = ({ clearFiltersPath, type }) => {
  const { setFilter, setCategory } = useAppContext();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleClearFilters = () => {
    setCategory("");
    setFilter("");
    const form = document.getElementById("filtersForm") as HTMLFormElement;
    form.reset();
  };
  const categoryMapping = type === "recipes" ? recipeCategoriesMapping : productCategoriesMapping
  return (
    <form id="filtersForm" className="bg-slate-300 rounded-lg p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <SearchInput handleSearch={handleSearch} />
        <Categories categoryMapping={categoryMapping} />
        <ClearFiltersButton handleClearFilters={handleClearFilters} clearFiltersPath={clearFiltersPath} />
      </div>
    </form>
  );
};


const SearchInput = ({ handleSearch }: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <label htmlFor="searchProductsInput" className="sr-only">
        {t('filters.searchLabel')}
      </label>
      <input
        type="search"
        id="searchProductsInput"
        onChange={handleSearch}
        placeholder={t('filters.searchPlaceholder')}
        className="w-full sm:w-62 py-2 pr-10 pl-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-100 dark:text-gray-800"
      />
      <SearchIcon />
    </div>
  );
};

const SearchIcon: FC = () => (
  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-gray-400">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
    </svg>
  </span>
);



const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({ handleClearFilters, clearFiltersPath }) => {
  const { t } = useTranslation();

  return (
    <Link to={clearFiltersPath}>
      <button
        onClick={handleClearFilters}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {t('filters.clearButton')}
      </button>
    </Link>
  );
};

export default Filters;