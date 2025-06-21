import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router"

export default function PrivateRoute({ children }) {
  const { loggedUser } = useAuth()

  if (!loggedUser) {
    return <Navigate to="/login" />
  }

  return children
}
