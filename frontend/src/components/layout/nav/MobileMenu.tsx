import { DialogPanel , Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

import AuthButton from "./AuthButton";
import useAuth from "../../../hooks/auth/useAuth";
import { MobileMenuButtonProps, MobileMenuProps } from "../../../providers/interface/general.props";
import FloatingCartButton from "../../cart/FloatingCart";
import DarkMode from "../../ui/DarkMode";
import Logo from "../../ui/Logo";

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  const menuItems = [
    { to: "/", label: t('nav.home') },
    { to: "/products", label: t('nav.shop') },
    { to: "/packages", label: t('nav.packages') },
    { to: "/recipes", label: t('nav.recipes') },
    { to: "/events", label: t('nav.events') },
    { to: "/about", label: t('nav.about') },
  ];
  const { isAdmin } = useAuth();
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="lg:hidden z-50">
      <div className="fixed inset-0 z-20" />
      <DialogPanel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white dark:bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
            <div className="space-y-2 py-6">
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
            <div className="py-6 flex justify-between ">
              {isAdmin && <Link to="/admin" className="flex items-center justify-center p-2 transition-colors rounded-full text-primary dark:text-white hover:bg-secondary hover:text-white">
                <BiUserCircle size={24} className="dark:text-white text-primary hover:text-white" />
              </Link>}
              <AuthButton />
              <DarkMode />
              <FloatingCartButton />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export const MobileMenuButton = ({ setMobileMenuOpen }: MobileMenuButtonProps) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={() => setMobileMenuOpen(true)}
      className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      aria-label={t('nav.openMenu')}
    >
      <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
    </button>
  );
};
export default MobileMenu;