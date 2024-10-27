import { useDeleteProductMutation } from "../../hooks/useProductsData";
import { Product } from "../../client";
import { toast } from "react-toastify";
import { useAppContext } from "../../hooks/useAppContext";
import { translateProductCategories } from "../../utils/constants";

const ProductList = () => {
  const { setAdminActiveSection, products } = useAppContext()
  if (!products) return null;
  return (
    <div className="mb-32" dir="rtl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold mb-4 text-center">מוצרים</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setAdminActiveSection("add-product")}>
          הוסף מוצר
        </button>
      </div>
      <ProductTable products={products} />
    </div>
  );
}

export default ProductList;

const ProductTableHeaderRow = () => {
  return (
    <tr className="text-center">
      <th scope="col" className="py-3 px-6">מס</th>
      <th scope="col" className="py-3 px-6">שם מוצר</th>
      <th scope="col" className="py-3 px-6">גודל</th>
      <th scope="col" className="py-3 px-6">מחיר</th>
      <th scope="col" className="px-6 py-3">קטגוריה</th>
      <th scope="col" className="py-3 px-6">פעולות</th>
    </tr>
  )
}
const ProductTableBodyRow = ({ product, idx }: { product: Product, idx: number }) => {
  const { showModal, setAdminActiveSection, setProductToEdit, refetchProducts } = useAppContext();
  const { mutate: deleteProductMutate, isSuccess, isError } = useDeleteProductMutation()
  const handleDeleteProduct = () => {
    showModal(
      () => {
        deleteProductMutate(product._id)
        refetchProducts()
      }
    );
  };

  const handleEditProduct = () => {
    setProductToEdit(product);
    setAdminActiveSection('edit-product');
  }
  if (isSuccess) {
    toast.success("Product has been deleted")
  }
  if (isError) {
    toast.error("Failed to delete product")
  }
  const { categories: englishCategories, name, pricing } = product
  const categories = translateProductCategories(englishCategories) as string[]
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        {idx + 1}
      </td>
      {/* name */}
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      {/* sizes */}
      <td className="py-4 px-6">{pricing.map((s, i) => {
        return (
          <p className="text-gray-500" key={i}>{s.size}</p>
        )
      })}</td>
      {/* price */}
      <td className="py-4 px-6">{pricing.map((p, i) => {
        return (
          <p className="text-gray-500" key={i}>{p.price}</p>
        )
      })}</td>
      {/* category */}
      <td className="px-6 py-4">
        {categories.map((cat, i) =>
          <div className="flex gap-4" key={i}>
            <span className="text-blue-900">{cat}</span>
          </div>
        )}
      </td>
      {/* actions */}
      <td className="flex justify-end gap-3 px-6 py-4">
        <button onClick={handleEditProduct} type="button" className="font-medium bg-yellow-500 text-white px-2 py-1 rounded-lg hover:underline">
          Edit
        </button>
        <button onClick={handleDeleteProduct} type="button" className="bg-red-500 text-white px-2 py-1 rounded-lg hover:underline">
          Delete
        </button>
      </td>
    </tr>
  )
}
const ProductTable = ({ products, }: { products: Product[] }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <ProductTableHeaderRow />
        </thead>
        <tbody>
          {
            products.map((product, idx) =>
              <ProductTableBodyRow key={idx} product={product} idx={idx} />
            )
          }
        </tbody>
      </table>
    </div>
  )
}