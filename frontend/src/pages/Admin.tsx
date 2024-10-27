import ProductList from '../components/admin/ProductsTable';
import ProductForm from '../components/admin/ProductForm';
import useAdminDashboard from '../hooks/useAdminDashboard';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { adminActiveSection, handleProductSubmit, productToEdit, setAdminActiveSection } = useAdminDashboard();

  const navItems = [
    { id: 'products', label: t('admin.products') },
    { id: 'add-product', label: t('admin.addProduct') },
    { id: 'recipes', label: t('admin.recipes') },
    { id: 'orders', label: t('admin.orders') }
  ];

  return (
    <div className="flex gap-4 min-h-screen bg-gray-100 mt-18" dir='rtl'>
      <aside className="w-64 bg-gray-800 text-white mt-16">
        <nav className="mt-6">
          <h1 className="text-2xl font-bold text-white pb-2 text-center">{t('admin.dashboardTitle')}</h1>
          <ul>
            {navItems.map(({ id, label }) => (
              <li
                key={id}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === id ? 'active' : ''}`}
                onClick={() => setAdminActiveSection(id)}
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Conditionally render the active section */}
      <main className="w-full mt-20">
        {adminActiveSection === 'products' && <ProductList />}
        {(adminActiveSection === 'add-product' || adminActiveSection === 'edit-product') && (
          <ProductForm
            product={productToEdit}
            onSubmit={handleProductSubmit}
            message={adminActiveSection === 'edit-product' ? t('admin.productUpdated') : t('admin.productAdded')}
          />
        )}
        {/* {adminActiveSection === 'recipes' && <AddProduct />} */}
        {/* {adminActiveSection === 'orders' && <AddProduct />} */}
      </main>
    </div>
  );
};

export default AdminDashboard;