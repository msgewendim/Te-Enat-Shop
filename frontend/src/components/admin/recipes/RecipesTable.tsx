import React from 'react';
import { Recipe } from "../../../client";
import ProductTableHeaderRowMemo from './RecipesTableHeaderRow';
import ProductTableBodyRowMemo from './RecipesTableBodyRow';
import { useTranslation } from 'react-i18next';

const RecipesTable: React.FC<{ recipes: Recipe[] }> = React.memo(({ recipes }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="sr-only">{t('admin.recipes.tableCaption')}</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <ProductTableHeaderRowMemo />
        </thead>
        <tbody>
          {recipes.map((product, idx) => (
            <ProductTableBodyRowMemo key={product._id || idx} recipe={product} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

RecipesTable.displayName = 'RecipesTable';

export default RecipesTable;