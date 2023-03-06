import "./Header.css";
import logo from "../../assets/modifyLogo.png";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} />
      </Link>
    </header>
  );
}
