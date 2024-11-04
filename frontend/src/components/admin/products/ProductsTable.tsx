import React from 'react';
import { Product } from "../../../client";
import ProductTableHeaderRowMemo from './ProductTableHeaderRow';
import ProductTableBodyRowMemo from './ProductTableBodyRow';
import { useTranslation } from 'react-i18next';

const ProductTable: React.FC<{ products: Product[] }> = React.memo(({ products }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="sr-only">{t('admin.products.tableCaption')}</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <ProductTableHeaderRowMemo />
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <ProductTableBodyRowMemo key={product._id || idx} product={product} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

ProductTable.displayName = 'ProductTable';

export default ProductTable;