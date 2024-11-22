import { useAppContext } from "../../../hooks/app/useAppContext";
import useGenericDashboard, { TableData } from '../../../hooks/app/useGenericDashboard';
import { Package } from '../../../client';
import { useDeletePackageMutation } from "../../../hooks/package/usePackagesData";
import usePackages from "../../../hooks/package/usePackages";

function usePackagesDashboard() {
  const { setPackageToEdit } = useAppContext();
  const { packages, isLoading, isError, error } = usePackages({ limit: 20 });
  const deleteMutation = useDeletePackageMutation();

  const displayFields = {
    name: "שם חבילה",
    price: "מחיר",
    servings: "מספר אנשים",
    ingredientsCount: "מספר מרכיבים",
  } as const;

  const formatTableData = (packages: Package[]): TableData[] => packages.map(pkg => ({
    _id: pkg._id,
    name: pkg.name,
    price: pkg.price + "₪",
    servings: pkg.peoplesQuantity,
    ingredientsCount: pkg.ingredientsQuantity,
  }));

  return useGenericDashboard<Package>({
    items: packages,
    isLoading,
    isError,
    error,
    deleteMutation,
    itemType: "package",
    formatTableData,
    displayFields,
    setItemToEdit: (pkg) => setPackageToEdit(pkg),
  });
}

export default usePackagesDashboard;