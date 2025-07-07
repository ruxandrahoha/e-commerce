import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

export default function AdminRoute() {
  const { loggedUser, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!loggedUser || !loggedUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
