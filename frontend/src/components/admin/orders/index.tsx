import Table from "../../../components/ui/Table";
import { OrdersDashboardReturn, OrderTableData } from "../../../providers/interface/admin.props";
import useOrdersDashboard from "./useOrdersDashboard";

const OrdersList = () => {
  const { tableData, headers, handleEdit, handleDelete } = useOrdersDashboard() as unknown as OrdersDashboardReturn;
  return (
    <Table<OrderTableData>
      headers={headers}
      data={tableData}
      className="my-4" // optional additional classes
      idField="_id"
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default OrdersList;
