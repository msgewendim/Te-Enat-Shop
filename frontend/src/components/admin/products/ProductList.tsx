import { useTranslation } from 'react-i18next';

import { useAppContext } from "../../../hooks/app/useAppContext";
import { ProductTableData } from '../../../providers/interface/admin.props';
import Filters from '../../ui/Filters';
import Table from "../../ui/Table";
import { Product } from '../../../client/types.gen';
import useAdminData from '../../../hooks/app/useAdminData';


const ProductList = () => {
  const { t } = useTranslation();
  const { setAdminActiveSection } = useAppContext();
  const adminData = useAdminData<Product>('products');

  // If adminData is JSX (loading/error state), return it directly
  if (!adminData || typeof adminData !== 'object' || 'type' in adminData) {
    return adminData;
  }

  const {
    tableData = [],
    headers = [],
    handleDelete: handleDeleteProduct,
    handleEdit: handleEditProduct,
  } = adminData;

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
      <Filters clearFiltersPath='/admin' type='product' className='mb-4' />
      <Table<ProductTableData>
        headers={headers}
        data={tableData as ProductTableData[]}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        idField="_id"
      />
    </section>
  );
};

export default ProductList;