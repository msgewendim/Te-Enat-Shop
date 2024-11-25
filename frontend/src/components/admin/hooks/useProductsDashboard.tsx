import { useAppContext } from "../../../hooks/app/useAppContext";
import useShop from '../../../hooks/product/useShop';
import { useDeleteProductMutation } from '../../../hooks/product/useProductsData';
import useGenericDashboard, { TableData } from '../../../hooks/app/useGenericDashboard';
import { Product } from '../../../client';

function useProductsDashboard() {
  const { setProductToEdit } = useAppContext();
  const { products, isLoading, isError, error, refetchProducts } = useShop({ limit: 20 });
  const deleteMutation = useDeleteProductMutation();

  const displayFields = {
    name: "שם מוצר",
    categories: "קטגוריות",
    subCategories: "תת-קטגוריות",
    pricing: "גודל | משקל | מחיר",
  } as const;

  const formatTableData = (products: Product[]): TableData[] => products.map(product => ({
    _id: product._id,
    name: product.name,
    categories: product.categories.map((cat, i) => (
      <span key={`cat-${i}`} className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
        {cat.nameInHebrew}
      </span>
    )),
    subCategories: product.subCategories?.map((subCat, i) => (
      <span key={`subCat-${i}`} className="inline-block bg-red-100 text-red-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
        {subCat.nameInHebrew}
      </span>
    )),
    pricing: (
      <div className="flex flex-wrap gap-2">
        {product.pricing.map((p, i) => (
          <span key={`price-${i}`} className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {p.size.sizeName} | ₪{p.price}
          </span>
        ))}
      </div>
    )
  }));

  return useGenericDashboard<Product>({
    items: products,
    isLoading,
    isError,
    error,
    deleteMutation,
    itemType: "product",
    formatTableData,
    displayFields,
    setItemToEdit: (product) => setProductToEdit(product),
    refetch: refetchProducts
  });
}

export default useProductsDashboard;
