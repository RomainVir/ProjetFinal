import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

export default function PublicRoute() {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (auth.email) {
    return <Navigate to="/donations" state={{ from: location }} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
