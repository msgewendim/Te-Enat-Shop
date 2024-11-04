import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { TbLogout } from "react-icons/tb";

import { TbLogin } from "react-icons/tb";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  if (isAuthenticated) {
    return (
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="text-md font-semibold leading-6 p-2 text-center"
        aria-label={t('nav.logout')}
      >
        <TbLogout className="text-primary" size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="text-md font-semibold leading-6 p-2 text-center"
      aria-label={t('nav.login')}
    >
      <TbLogin color='black' size={24} />
    </button>
  );
};

export default AuthButton;