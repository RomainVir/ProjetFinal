import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/";

export default function PrivateRoute({ allowedRoles }) {
  const { authorization } = useAuthContext();

  return allowedRoles?.includes(authorization.role) ? (
    <Outlet />
  ) : authorization?.email ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
}
