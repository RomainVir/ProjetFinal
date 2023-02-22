import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/";

export default function PrivateRoute({ allowedRoles }) {
  const { auth } = useAuthContext();

  return allowedRoles?.includes(auth.role) ? (
    <Layout />
  ) : auth?.email ? (
    <Navigate to="/unauthorized"  />
  ) : (
    <Navigate to="/login"  />
  );
}