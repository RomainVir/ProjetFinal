import ModifierBDD from "../../../components/BDD/AjouterProduit";
import PublierListe from "../../../components/BDD/PublierListe";
import "./AdminBDD.css";
export default function AdminBDD() {
  return (
    <>
      <div className="adminBDD">
        <div className="modifierBDD">
          <ModifierBDD />
        </div>
        <div className="publierBDD">
          <PublierListe />
        </div>
      </div>
    </>
  );
}
