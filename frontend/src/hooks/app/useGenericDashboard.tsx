import { useTranslation } from 'react-i18next';
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import Loader from "../../components/ui/Loader";

type DashboardConfig<T> = {
  items: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  deleteMutation: {
    mutate: (id: string) => void;
    isSuccess: boolean;
    isError: boolean;
  };
  itemType: string;
  formatTableData: (items: T[]) => TableData[];
  displayFields: Record<string, string>;
  setItemToEdit: (item: T) => void;
};

export type TableData = {
  _id: string;
  [key: string]: string | number | React.ReactNode;
};

function useGenericDashboard<T extends { _id: string }>({
  items,
  isLoading,
  isError,
  error,
  deleteMutation,
  itemType,
  formatTableData,
  displayFields,
  setItemToEdit,
}: DashboardConfig<T>) {
  const { t } = useTranslation();
  const { setAdminActiveSection, showModal } = useAppContext();

  const handleDelete = useCallback((id: string) => {
    showModal(() => {
      deleteMutation.mutate(id);
      toast.success(t(`admin.${itemType}s.deleteSuccess`));
      setAdminActiveSection(`${itemType}s`);
    });
  }, [showModal, deleteMutation, t, itemType, setAdminActiveSection]);

  const handleEdit = useCallback((item_id: string) => {
    const itemToEdit = items?.find(item => item._id === item_id);
    if (itemToEdit) {
      setAdminActiveSection(`edit-${itemType}`);
      setItemToEdit(itemToEdit);
    } else {
      toast.error(t(`admin.${itemType}s.notFound`));
    }
  }, [items, setAdminActiveSection, setItemToEdit, itemType, t]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success(t(`admin.${itemType}s.deleteSuccess`));
    }
    if (deleteMutation.isError) {
      toast.error(t(`admin.${itemType}s.deleteError`));
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError, itemType, t]);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message);
    return null;
  }

  const tableData = items ? formatTableData(items) : [];
  const headers = Object.values(displayFields);

  return { tableData, headers, handleDelete, handleEdit };
}

export default useGenericDashboard; 