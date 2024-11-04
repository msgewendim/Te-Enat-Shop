import { useTranslation } from 'react-i18next';

const RecipeTableHeaderRow = () => {
  const { t } = useTranslation();

  return (
    <tr className="text-center">
      <th scope="col" className="py-3 px-6">{t('admin.recipes.table.number')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.recipes.table.recipeName')}</th>
      <th scope="col" className="px-6 py-3">{t('admin.recipes.table.category')}</th>
      <th scope="col" className="py-3 px-6">{t('admin.recipes.table.difficulty')}</th>
      <th scope="col" className="py-3 px-6">{t('buttons.actions.title')}</th>
    </tr>
  );
};

export default RecipeTableHeaderRow