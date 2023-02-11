import AjouterProduit from "../../../components/BDD/AjouterProduit/AjouterProduit";
import Publier from "../../../components/BDD/PublierListe/PublierListe";
import "./AdminBDD.css";
export default function AdminBDD() {
  return (
    <>
      <div className="adminBDD">
        <div className="publierBDD">
          <Publier />
        </div>
        <div className="modifierBDD">
          <AjouterProduit />
        </div>
      </div>
    </>
  );
}
