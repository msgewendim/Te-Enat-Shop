import { Package } from '../../../client/types.gen';
import { useAppContext } from "../../../hooks/app/useAppContext";
import useGenericDashboard from '../../../hooks/app/useGenericDashboard';
import useGenericData from "../../../hooks/app/useGenericData";
import usePackages from "../../../hooks/package/usePackages";
import { TableData } from "../../../providers/interface/general.props";

function usePackagesDashboard() {
  const { setPackageToEdit } = useAppContext();
  const { packages, isLoading, isError, error } = usePackages({ limit: 20 });
  const { useDeleteItemMutation } = useGenericData<Package>("/packages");
  const deleteMutation = useDeleteItemMutation();

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