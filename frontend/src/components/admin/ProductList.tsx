import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from "../../hooks/useAppContext";
import ProductTable from './ProductsTable';

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const { setAdminActiveSection, products } = useAppContext();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p>{t('admin.products.noProducts')}</p>
      </div>
    );
  }

  return (
    <section className="mb-32 px-4 md:px-0" aria-labelledby="product-list-title">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 id="product-list-title" className="text-2xl font-bold mb-4 sm:mb-0">
          {t('admin.products.title')}
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={() => setAdminActiveSection("add-product")}
          aria-label={t('admin.products.add')}
        >
          {t('admin.products.add')}
        </button>
      </div>
      <ProductTable products={products} />
    </section>
  );
}

export default ProductList;