import { Link } from "react-router-dom";
import DarkMode from "../../ui/DarkMode";
import AuthButton from "./AuthButton";
import { BiUserCircle } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../hooks/useAppContext";
import FloatingCartButton from "../../cart/FloatingCart";

const DesktopMenu = () => {
  const { t } = useTranslation();
  const menuItems = [
    { to: "/", label: t('nav.home') },
    { to: "/products", label: t('nav.shop') },
    { to: "/packages", label: t('nav.packages') },
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

export const DesktopActions = () => {
  const { setOpenCart, cartItems } = useAppContext()
  return (
    <div className="hidden lg:flex lg:gap-x-6 items-center">
      <Link to="/admin" className="text-md font-semibold leading-6 p-2 text-center">
        <BiUserCircle size={24} className="text-primary" />
      </Link>
      <FloatingCartButton cartItemsCount={cartItems.length} setOpenCart={setOpenCart} />
      <AuthButton />
      <DarkMode />
    </div>
  );
};

export default DesktopMenu;