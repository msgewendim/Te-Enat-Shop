import { useTranslation } from "react-i18next";
import { TbLogout, TbLogin } from "react-icons/tb";

import useAuth from "../../../hooks/auth/useAuth";

const AuthButton = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <button
      onClick={isAuthenticated ? () => logout({ logoutParams: { returnTo: window.location.origin } }) : () => loginWithPopup()}
      className="flex items-center justify-center p-2 transition-colors rounded-full text-primary dark:text-white hover:bg-secondary hover:text-white"
      aria-label={isAuthenticated ? t('nav.logout') : t('nav.login')}
    >
      {isAuthenticated ? (
        <TbLogout size={24} />
      ) : (
        <TbLogin size={24} />
      )}
    </button>
  );
};

export default AuthButton;