import { useTranslation } from "react-i18next";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

import AuthButton from "./AuthButton";
import useAuth from "../../../hooks/auth/useAuth";
import FloatingCartButton from "../../cart/FloatingCart";
import DarkMode from "../../ui/DarkMode";

const DesktopMenu = () => {
  const { t } = useTranslation();
  const menuItems = [
    { to: "/", label: t('nav.home') },
    { to: "/products", label: t('nav.shop') },
    { to: "/packages", label: t('nav.packages') },
    { to: "/recipes", label: t('nav.recipes') },
    // { to: "/events", label: t('nav.events') },
    { to: "/about", label: t('nav.about') },
  ];

  return (
    <div className="hidden lg:flex lg:gap-x-8">
      {menuItems.map((item) => (
        <Link key={item.to} to={item.to} className="text-md font-medium text-primary hover:text-white dark:text-white dark:hover:text-white hover:bg-secondary dark:hover:bg-secondary transition-colors rounded-full p-2">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export const DesktopActions = () => {
  const { isAdmin } = useAuth();
  return (
    <div className="hidden lg:flex lg:gap-x-6 items-center">
      {isAdmin && (
        <Link to="/admin" className="flex items-center justify-center p-2 transition-colors rounded-full dark:text-white hover:bg-secondary hover:text-white">
          <BiUserCircle size={24} className="dark:text-white text-primary hover:text-white" />
        </Link>
      )}
      <FloatingCartButton />
      <DarkMode />
      <AuthButton />
    </div>
  );
};

export default DesktopMenu;