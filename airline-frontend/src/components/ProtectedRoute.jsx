import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" />;
}
