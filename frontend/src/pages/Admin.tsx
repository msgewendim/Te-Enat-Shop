import ProductList from '../components/admin/ProductsTable';
import ProductForm from '../components/admin/ProductForm';
import useAdminDashboard from '../hooks/useAdminDashboard';

const AdminDashboard = () => {
  const { adminActiveSection, handleProductSubmit, productToEdit, setAdminActiveSection } = useAdminDashboard()
  return (
    <div className="flex gap-4 min-h-screen bg-gray-100 mt-18" dir='rtl'>
      <aside className="w-64 bg-gray-800 text-white mt-16">
        <nav className="mt-6">
          <h1 className="text-2xl font-bold text-white pb-2 text-center">דף ניהול</h1>
          <ul>
            <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === 'products' ? 'active' : ''}`} onClick={() => setAdminActiveSection('products')}
            >
              מוצרים
            </li>
            <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === 'add-product' ? 'active' : ''}`} onClick={() => setAdminActiveSection('add-product')}
            >
              הוסף-מוצר
            </li>
            <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === 'recipes' ? 'active' : ''}`} onClick={() => setAdminActiveSection('recipes')}
            >
              מתכונים
            </li>
            <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === 'orders' ? 'active' : ''}`} onClick={() => setAdminActiveSection('orders')}
            >
              הזמנות
            </li>
          </ul>
        </nav>
      </aside>
      {/* Conditionally render the active section */}
      <main className="w-full mt-20">
        {adminActiveSection === 'products' && <ProductList />}
        {(adminActiveSection === 'add-product' || adminActiveSection === 'edit-product') &&
          <ProductForm
            product={productToEdit}
            onSubmit={handleProductSubmit}
            message={adminActiveSection === 'edit-product' ? 'מוצר עודכן בהצלחה' : 'מוצר נוסף בהצלחה'}
          />
        }
        {/* {adminActiveSection === 'recipes' && <AddProduct />}
        {adminActiveSection === 'orders' && <AddProduct />} */}
      </main>
    </div>
  );
};

export default AdminDashboard;