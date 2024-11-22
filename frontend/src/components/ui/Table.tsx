import { useTranslation } from "react-i18next";

const Table = <T extends Record<string, unknown>>({
  idField,
  headers,
  data,
  className = '',
  onEdit,
  onDelete
}: TableProps<T>) => {
  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">מספר</th>
            {headers?.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {rowIndex + 1}
              </td>
              {Object.values(row)?.slice(1).map((cell, cellIndex) => (
                <td key={cellIndex} className={cellIndex === 0 ? "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" : "px-6 py-4"}>
                  {cell as React.ReactNode}
                </td>
              ))}
              <Actions onEdit={onEdit} onDelete={onDelete} id={String(row[idField])} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type TableProps<T extends Record<string, unknown>> = {
  headers: string[];
  data: T[];
  className?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  idField: string;
};

const Actions = ({ onEdit, onDelete, id }: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  id: string
}) => {
  const { t } = useTranslation();

  return <td className="px-6 py-4 text-right flex items-center justify-between gap-2">
    {(
      <button
        onClick={() => onEdit(id)}
        type="button"
        className="font-medium bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors mr-2"
        aria-label={t('admin.products.edit')}
      >
        {t('admin.products.edit')}
      </button>
    )}
    {(
      <button
        onClick={() => onDelete(id)}
        type="button"
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
        aria-label={t('admin.products.delete')}
      >
        {t('admin.products.delete')}
      </button>
    )}
  </td>
};
Table.displayName = 'Table';
export default Table;
