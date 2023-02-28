import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./logout.css";

export default function Adios() {
  const { authorization, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!authorization) {
    navigate("/");
  }
  return (
    <div>
      <form className="fermercession">
        <h1>Seguro que has terminado?</h1>
        <button className="close" onClick={logout}>
          Si, cerrar mi cesión
        </button>
        <br />
        <Link to="/donaciones">
          <button>No, volver a las ofertas</button>
        </Link>
      </form>
    </div>
  );
}
