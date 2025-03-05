import { useTranslation } from 'react-i18next';

import { useAppContext } from '../../../hooks/app/useAppContext';
import { RecipeTableData , RecipeDashboardReturn } from '../../../providers/interface/admin.props';
import Filters from '../../ui/Filters';
import Table from "../../ui/Table";
import useRecipesDashboard from '../hooks/useRecipesDashboard';


const RecipeList = () => {
  const { t } = useTranslation();
  const { setAdminActiveSection } = useAppContext();
  const {
    tableData = [],
    headers = [],
    handleDelete: handleDeleteRecipe,
    handleEdit: handleEditRecipe
  } = (useRecipesDashboard() as unknown as RecipeDashboardReturn) || {};

  return (
    <section className="mb-32 px-4 md:px-0" aria-labelledby="recipe-list-title">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 id="recipe-list-title" className="text-2xl font-bold mb-4 sm:mb-0">
          {t('admin.recipes.title')}
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={() => setAdminActiveSection("add-recipe")}
          aria-label={t('admin.recipes.add')}
        >
          {t('admin.recipes.add')}
        </button>
      </div>
      <Filters clearFiltersPath='' type='recipe' className='mb-4' />
      <Table<RecipeTableData>
        headers={headers}
        data={tableData}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteRecipe}
        idField="_id"
      />
    </section>
  );
};

export default RecipeList;