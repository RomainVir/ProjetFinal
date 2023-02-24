import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function PublicRoute() {
  const { authorization } = useAuthContext();

  if (authorization.email) {
    return <Navigate to="/donaciones" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
