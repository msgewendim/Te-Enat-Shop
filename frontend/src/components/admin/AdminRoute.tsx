import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate()
  console.log(user, isAuthenticated);
  if (!isAuthenticated) {
    navigate("/");
    toast.error("log in failed");
  }
  if (isLoading) {
    return <Loader />
  }
  if (!user) {
    navigate("/");
    toast.error("You do not have admin rights");
  }
  return children
};

export default AdminRoute