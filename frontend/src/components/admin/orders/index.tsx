import Table from "../../../components/ui/Table";
import useOrdersDashboard from "../hooks/useOrdersDashboard";
import { OrdersDashboardReturn, OrderTableData } from "../../../providers/interface/admin.props";

const OrdersList = () => {
  const { tableData, headers, handleEdit, handleDelete } = useOrdersDashboard() as OrdersDashboardReturn;
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
