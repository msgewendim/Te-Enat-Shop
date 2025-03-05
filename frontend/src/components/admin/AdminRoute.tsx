import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/auth/useAuth";
import Loader from "../ui/Loader";


const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error(t("errors.loginRequired"));
      navigate("/");
      return;
    }

    if (!isAdmin) {
      toast.error(t("errors.unauthorized"));
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate, t]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminRoute;