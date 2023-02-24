import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Adios() {
  const { authorization, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!authorization) {
    navigate("/");
  }
  return authorization.email && <button onClick={logout}>Cerrar cesión</button>;
}
