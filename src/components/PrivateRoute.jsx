import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const { loggedUser } = useAuth();

  if (!loggedUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
