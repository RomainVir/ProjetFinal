import "./Header.css";
import logo from "../../assets/logo.png";
export default function Header() {
  return (
    <header className="container header-inner">
      <img src={logo} />
      <div>
        <h1>Portail des donations</h1>
      </div>
    </header>
  );
}
