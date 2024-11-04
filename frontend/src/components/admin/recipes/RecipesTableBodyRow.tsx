import React, { FC, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import { Recipe } from "../../../client";
import { useAppContext } from "../../../hooks/useAppContext";
import { translateProductCategories } from "../../../utils/constants";
import { useDeleteRecipeMutation } from '../../../hooks/useRecipesData';

interface ProductTableBodyRowProps {
  recipe: Recipe;
  idx: number;
}

const ProductTableBodyRow: FC<ProductTableBodyRowProps> = ({ recipe, idx }) => {
  const { t } = useTranslation();
  const { showModal, setAdminActiveSection, setRecipeToEdit } = useAppContext();
  const { mutate: deleteRecipeMutate, isSuccess, isError } = useDeleteRecipeMutation();

  const handleDeleteProduct = useCallback(() => {
    showModal(() => {
      deleteRecipeMutate(recipe._id);
    });
  }, [showModal, deleteRecipeMutate, recipe._id]);

  const handleEditProduct = useCallback(() => {
    setRecipeToEdit(recipe);
    setAdminActiveSection('edit-recipe');
  }, [setRecipeToEdit, setAdminActiveSection, recipe]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('admin.recipes.deleteSuccess'));
    }
    if (isError) {
      toast.error(t('admin.recipes.deleteError'));
    }
  }, [isSuccess, isError, t]);

  const { categories: englishCategories, name, difficulty } = recipe;
  const categories = translateProductCategories(englishCategories) as string[];

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{idx + 1}</td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td className="px-6 py-4 overflow-clip">
        {categories.map((cat, i) => (
          <span key={`cat-${i}`} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {cat}
          </span>
        ))}
      </td>
      <td className="py-4 px-6">
        <p className="text-gray-500">{difficulty}</p>
      </td>
      <td className="px-6 py-4 text-right flex items-center justify-between gap-2">
        <button
          onClick={handleEditProduct}
          type="button"
          className="font-medium bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors mr-2"
          aria-label={t('buttons.actions.edit')}
        >
          {t('buttons.actions.edit')}
        </button>
        <button
          onClick={handleDeleteProduct}
          type="button"
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          aria-label={t('buttons.actions.delete')}
        >
          {t('buttons.actions.delete')}
        </button>
      </td>
    </tr>
  );
};

export default React.memo(ProductTableBodyRow);