import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { TbLogin, TbLogout } from 'react-icons/tb';
import DarkMode from '../ui/DarkMode';
import Loader from '../ui/Loader';
import { MobileMenuButtonProps, MobileMenuProps } from '../../providers/interface/general.props';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading } = useAuth0();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [controlNavbar]);

  if (isLoading) return <Loader />;

  return (
    <header className={`fixed top-0 w-full sm:w-[90vw] shadow-md bg-white dark:bg-gray-900 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} z-20`}>
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4" dir="rtl">
          <Logo />
          <DesktopMenu />
          <DesktopActions />
          <MobileMenuButton setMobileMenuOpen={setMobileMenuOpen} />
        </div>
      </nav>
      <MobileMenu
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />
    </header>
  );
};

const Logo = () => (
  <Link to="/" className="text-2xl sm:text-3xl font-bold text-primary dark:text-white">
    {/* TE-ENATE */} טאנת
  </Link>
);

const DesktopMenu = () => {
  const { t } = useTranslation();
  const menuItems = [
    { to: "/", label: t('nav.home') },
    { to: "/products", label: t('nav.shop') },
    { to: "/recipes", label: t('nav.recipes') },
    { to: "/about", label: t('nav.about') },
  ];

  return (
    <div className="hidden lg:flex lg:gap-x-8">
      {menuItems.map((item) => (
        <Link key={item.to} to={item.to} className="text-md font-medium text-primary hover:text-secondary dark:text-white">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const DesktopActions = () => {
  const { isAuthenticated, user } = useAuth0()
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex lg:gap-x-6 items-center">
      {isAuthenticated && user && (
        <div className="flex items-center gap-2">
          <img alt={user.name} src={user.picture} className="h-6 w-6 rounded-full" />
          {user.roles?.includes("admin") && <Link to="/admin">{t('nav.adminPanel')}</Link>}
        </div>
      )}
      <AuthButton />
      <DarkMode />
    </div>
  );
};

const AuthButton = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  if (isAuthenticated) {
    return (
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="text-md font-semibold leading-6 p-2 text-center"
        aria-label={t('nav.logout')}
      >
        <TbLogout color='black' size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={() => loginWithPopup()}
      className="text-md font-semibold leading-6 p-2 text-center"
      aria-label={t('nav.login')}
    >
      <TbLogin color='black' size={24} />
    </button>
  );
};

const MobileMenuButton = ({ setMobileMenuOpen }: MobileMenuButtonProps) => (
  <button
    type="button"
    onClick={() => setMobileMenuOpen(true)}
    className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    aria-label="Open main menu"
  >
    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
  </button>
);

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  const menuItems = [
    { to: "/", label: t('nav.home') },
    { to: "/products", label: t('nav.shop') },
    { to: "/recipes", label: t('nav.recipes') },
    { to: "/about", label: t('nav.about') },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            aria-label={t('nav.closeMenu')}
          >
            <XMarkIcon className="h-6 w-6 dark:text-white" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6" dir="rtl">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="py-6 flex justify-between">
              <AuthButton />
              <DarkMode />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default Navbar;