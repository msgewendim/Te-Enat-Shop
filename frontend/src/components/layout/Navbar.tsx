import { useCallback, useEffect, useState } from 'react';

import Loader from '../ui/Loader'
import Logo from '../ui/Logo';
import DesktopMenu, { DesktopActions } from './nav/DesktopMenu';
import MobileMenu, { MobileMenuButton } from './nav/MobileMenu';
import useAuth from '../../hooks/auth/useAuth';
import Cart from '../../pages/Cart';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [controlNavbar]);

  if (isLoading) return <Loader />;

  return (
    <header className={`fixed top-0 w-full sm:w-[90vw] shadow-md bg-white dark:bg-gray-900 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} z-20`}>
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
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
      <Cart />
    </header>
  );
};

export default Navbar;