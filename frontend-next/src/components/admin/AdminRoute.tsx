"use client"
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/auth/useAuth";
import Loader from "../ui/Loader";


const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error(t("errors.loginRequired"));
      router.push("/");
      return;
    }

    if (!isAdmin) {
      toast.error(t("errors.unauthorized"));
      router.push("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, router, t]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminRoute;