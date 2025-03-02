import useGenericDashboard from '../../../hooks/app/useGenericDashboard';
import { Order } from '../../../client';
import useGenericData from "../../../hooks/app/useGenericData";
import { TableData } from "../../../providers/interface/general.props";

function useOrdersDashboard() {
  const { useGetItems } = useGenericData<Order>("/orders");
  const { data: orders, isLoading, isError, error } = useGetItems({
    limit: 10
  });
  const displayFields = {
    username: "שם משתמש",
    products: "מוצרים",
    orderStatus: "סטטוס הזמנה",
    totalPrice: "סה״כ",
    createdAt: "תאריך הזמנה",
  } as const;
  const formatTableData = (orders: Order[]): TableData[] => orders.map((order, index) => ({
    _id: order._id ?? `order-${index}`,
    userId: order.customer.firstName,
    products: order.orderItems?.map((orderItem, index) => <span key={`order-item-${index}`} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
      {orderItem.item.name}
    </span>),
    orderStatus: order.orderStatus,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' }) : '',
  }));

  return useGenericDashboard<Order>({
    items: orders || [],
    isLoading,
    isError,
    error,
    deleteMutation: { mutate: () => { }, isSuccess: false, isError: false },
    itemType: "order",
    formatTableData,
    displayFields,
    setItemToEdit: () => { }
  });
}

export default useOrdersDashboard;