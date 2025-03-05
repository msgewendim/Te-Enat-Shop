import { ChangeEvent, FC } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import FilterCategories from "./Categories";
import { useAppContext } from "../../hooks/app/useAppContext";
import { ClearFiltersButtonProps, FiltersProps } from "../../providers/interface/general.props";
import { categoriesBasedOnType } from "../../utils/helperFunctions";


const Filters: FC<FiltersProps> = ({ clearFiltersPath, type, className }) => {
  const { setFilter, setCategory, setSubCategory } = useAppContext();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setSubCategory("");
  };

  const handleSubCategoryChange = (selectedSubCategory: string) => {
    setSubCategory(selectedSubCategory);
  };

  const handleClearFilters = () => {
    setCategory("");
    setSubCategory("");
    setFilter("");
    const form = document.getElementById("filtersForm") as HTMLFormElement;
    form.reset();
  };
  const { categories, subCategoriesMapping } = categoriesBasedOnType(type)
  return (
    <form id="filtersForm" className={`bg-slate-200 rounded-lg p-4 sm:p-5 w-full ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <SearchInput handleSearch={handleSearch} type={type} />
        <FilterCategories
          categories={categories}
          subCategoriesMapping={subCategoriesMapping}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
        />
        <ClearFiltersButton handleClearFilters={handleClearFilters} clearFiltersPath={clearFiltersPath} />
      </div>
    </form>
  );
};


const SearchInput = ({ handleSearch, type }: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
  type: string
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
        placeholder={t(`filters.searchPlaceholder${type.charAt(0).toUpperCase() + type.slice(1)}`)}
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