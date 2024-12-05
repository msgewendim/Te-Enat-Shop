import Table from "../../ui/Table";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../hooks/app/useAppContext";
import usePackagesDashboard from "../hooks/usePackagesDashboard";
import { PackageDashboardReturn, PackageTableData } from "../../../providers/interface/admin.props";

const PackageList = () => {
  const { t } = useTranslation();
  const { setAdminActiveSection } = useAppContext();
  const {
    tableData,
    headers,
    handleDelete: handleDeletePackage,
    handleEdit: handleEditPackage
  } = (usePackagesDashboard() as unknown as PackageDashboardReturn) || {};

  return (
    <section className="mb-32 px-4 md:px-0" aria-labelledby="package-list-title">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 id="package-list-title" className="text-2xl font-bold mb-4 sm:mb-0">
          {t('admin.packages.title')}
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={() => setAdminActiveSection("add-package")}
          aria-label={t('admin.packages.add')}
        >
          {t('admin.packages.add')}
        </button>
      </div>
      <Table<PackageTableData>
        headers={headers}
        data={tableData}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage}
        idField="_id"
      />
    </section>
  );
};

export default PackageList;
