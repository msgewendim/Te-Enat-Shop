import React, { FC, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import { Product } from "../../client";
import { useAppContext } from "../../hooks/useAppContext";
import { useDeleteProductMutation } from "../../hooks/useProductsData";
import { translateProductCategories } from "../../utils/constants";

interface ProductTableBodyRowProps {
  product: Product;
  idx: number;
}

const ProductTableBodyRow: FC<ProductTableBodyRowProps> = ({ product, idx }) => {
  const { t } = useTranslation();
  const { showModal, setAdminActiveSection, setProductToEdit, refetchProducts } = useAppContext();
  const { mutate: deleteProductMutate, isSuccess, isError } = useDeleteProductMutation();

  const handleDeleteProduct = useCallback(() => {
    showModal(() => {
      deleteProductMutate(product._id);
      refetchProducts();
    });
  }, [showModal, deleteProductMutate, product._id, refetchProducts, t]);

  const handleEditProduct = useCallback(() => {
    setProductToEdit(product);
    setAdminActiveSection('edit-product');
  }, [setProductToEdit, setAdminActiveSection, product]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('admin.products.deleteSuccess'));
    }
    if (isError) {
      toast.error(t('admin.products.deleteError'));
    }
  }, [isSuccess, isError, t]);

  const { categories: englishCategories, name, pricing } = product;
  const categories = translateProductCategories(englishCategories) as string[];

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{idx + 1}</td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td className="py-4 px-6">
        {pricing.map((s, i) => (
          <p className="text-gray-500" key={`size-${i}`}>{s.size}</p>
        ))}
      </td>
      <td className="py-4 px-6">
        {pricing.map((p, i) => (
          <p className="text-gray-500" key={`price-${i}`}>{p.price}</p>
        ))}
      </td>
      <td className="px-6 py-4 overflow-clip">
        {categories.map((cat, i) => (
          <span key={`cat-${i}`} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {cat}
          </span>
        ))}
      </td>
      <td className="px-6 py-4 text-right flex items-center justify-between gap-2">
        <button
          onClick={handleEditProduct}
          type="button"
          className="font-medium bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors mr-2"
          aria-label={t('admin.products.edit')}
        >
          {t('admin.products.edit')}
        </button>
        <button
          onClick={handleDeleteProduct}
          type="button"
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          aria-label={t('admin.products.delete')}
        >
          {t('admin.products.delete')}
        </button>
      </td>
    </tr>
  );
};

export default React.memo(ProductTableBodyRow);