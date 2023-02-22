import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

export default function PublicRoute() {
  const { auth } = useAuthContext();

  if (auth.email) {
    return <Navigate to="/offres" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
