import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import Loader from "./components/UI/Loader";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="*" replace />;
  }

  return children;
}
