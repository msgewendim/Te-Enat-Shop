import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { AUTH0_AUDIENCE } from "../../utils/env.config";
import { useTranslation } from "react-i18next";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error(t("errors.loginRequired"));
      navigate("/");
      return;
    }

    const isAdmin = user?.[`${AUTH0_AUDIENCE}/roles`]?.includes('Admin', 'admin');

    if (!isAdmin) {
      toast.error(t("errors.unauthorized"));
      navigate("/");
    }
  }, [isAuthenticated, user, isLoading, navigate, t]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminRoute;