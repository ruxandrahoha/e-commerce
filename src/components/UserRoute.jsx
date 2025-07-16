import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

export default function UserRoute() {
  const { loggedUser, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!loggedUser) {
    return (
      <Navigate
        to="/login"
        state={{
          errorMessage: "Trebuie să aveți cont pentru a accesa această pagină.",
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
