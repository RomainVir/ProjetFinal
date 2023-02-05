import "./Header.css";
import logo from "../../assets/logo.png";
export default function Header() {
  return (
    <header className="container header-inner">
      <img src={logo} />
      <input className="search" placeholder="search your bike here" />
      <div class="panier">
        <h4 className="contador" id="contador">
          0
        </h4>
      </div>
    </header>
  );
}
