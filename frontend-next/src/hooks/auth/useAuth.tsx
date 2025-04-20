import { useAuth0 } from "@auth0/auth0-react";

import { AUTH0_AUDIENCE } from "../../utils/env.config";

const useAuth = () => {
  const { getAccessTokenSilently, isAuthenticated, logout, isLoading, loginWithPopup, error, user } = useAuth0();
  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  }

  const isAdmin: boolean = user?.[`${AUTH0_AUDIENCE}/roles`]?.includes('Admin', 'admin');

  return { getToken, isAuthenticated, logout, isLoading, loginWithPopup, isAdmin, error, user };
};

export default useAuth;