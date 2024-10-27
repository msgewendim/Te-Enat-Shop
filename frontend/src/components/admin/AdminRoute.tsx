import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Don't do anything while loading

    if (!isAuthenticated) {
      toast.error("Log in failed");
      navigate("/");
    } else if (!user) {
      toast.error("You do not have admin rights");
      navigate("/");
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>; // Return children if authenticated and user exists
};

export default AdminRoute;