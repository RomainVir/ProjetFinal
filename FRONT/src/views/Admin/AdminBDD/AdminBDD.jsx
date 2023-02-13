import AjouterProduit from "../../../components/BDD/AjouterProduit/AjouterProduit";
import ModifierProduit from "../../../components/BDD/ModifierProduit/ModifierProduit";
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
        <div className="modifierBDD">
          <ModifierProduit />
        </div>
      </div>
    </>
  );
}
