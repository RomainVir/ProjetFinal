import { useAuthContext } from "../../../context/AuthContext";

export default function Adios() {
  const { authorization, logout } = useAuthContext();

  return authorization.email && <button onClick={logout}>Logout</button>;
}
