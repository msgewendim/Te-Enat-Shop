import { useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

import { useAppContext } from "./useAppContext";
import Loader from "../../components/ui/Loader";
import { DashboardConfig } from '../../providers/interface/general.props';

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
  refetch
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
      refetch && refetch();
    }
    if (deleteMutation.isError) {
      toast.error(t(`admin.${itemType}s.deleteError`));
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError, itemType, t, refetch]);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message);
    return null;
  }

  const tableData = items ? formatTableData(items) : [];
  const headers = Object.values(displayFields);

  return { tableData, headers, handleDelete, handleEdit, refetch };
}

export default useGenericDashboard; 