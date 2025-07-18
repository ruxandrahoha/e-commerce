import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

export default function AdminRoute() {
  const { loggedUser, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  if (!loggedUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
