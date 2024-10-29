import { useState } from 'react';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import useAdminDashboard from '../hooks/useAdminDashboard';
import { useTranslation } from 'react-i18next';
import { ArrowLeftCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { adminActiveSection, handleProductSubmit, productToEdit } = useAdminDashboard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen bg-gray-100 mt-18" dir='rtl'>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-[50%] right-4 z-20 bg-gray-800 text-white p-2 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <XMarkIcon width={24} /> : <ArrowLeftCircleIcon width={24} />}
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white mt-16">
        <nav className="mt-6">
          <h1 className="text-2xl font-bold text-white pb-2 text-center">{t('admin.dashboardTitle')}</h1>
          <NavList setIsMenuOpen={setIsMenuOpen} />
        </nav>
      </aside>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 text-white z-10 overflow-y-auto">
          <nav className="mt-16 p-4">
            <h1 className="text-2xl font-bold text-white pb-2 text-center">{t('admin.dashboardTitle')}</h1>
            <NavList setIsMenuOpen={setIsMenuOpen} />
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="w-full mt-20 px-4">
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
const NavList = ({ setIsMenuOpen }: {
  setIsMenuOpen: (open: boolean) => void,
}) => {
  const { t } = useTranslation();
  const { adminActiveSection, setAdminActiveSection, } = useAdminDashboard();

  const navItems = [
    { id: 'products', label: t('admin.products.title') },
    { id: 'add-product', label: t('admin.addProduct') },
    { id: 'recipes', label: t('admin.recipes') },
    { id: 'orders', label: t('admin.orders') }
  ];
  return (
    <ul>
      {navItems.map(({ id, label }) => (
        <li
          key={id}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === id ? 'bg-gray-700' : ''}`}
          onClick={() => {
            setAdminActiveSection(id);
            setIsMenuOpen(false);
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
export default AdminDashboard;