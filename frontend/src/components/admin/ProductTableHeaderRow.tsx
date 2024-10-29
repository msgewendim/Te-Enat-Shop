import { useTranslation } from 'react-i18next';

const ProductTableHeaderRow = () => {
  const { t } = useTranslation();

  return (
    <tr className="text-center">
      <th scope="col" className="py-3 px-6">{t('admin.products.table.number')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.products.table.productName')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.products.table.size')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.products.table.price')}</th>
      <th scope="col" className="px-6 py-3">{t('admin.products.table.category')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.products.table.actions')}</th>
    </tr>
  );
};

export default ProductTableHeaderRow