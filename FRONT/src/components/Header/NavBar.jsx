import { Link } from "react-router-dom";
import logo from "../../assets/Logo_GGM_bleu.png";

export default function NavBar({ menuItems }) {
  return (
    <nav className="menu">
      <div className="div">
        <div className="container-menus">
          <ul className="navbar-nav">
            {menuItems.map((menuItem, index) => (
              <li className="nav-item" key={index}>
                
                <Link className="link" to={menuItem.path}>
                  {menuItem.label}
                </Link>
              </li>
              
            ))}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
