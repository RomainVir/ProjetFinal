import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function PublicRoute() {
  const { authorization } = useAuthContext();

  if (authorization.email) {
    return <Navigate to="/offres" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
