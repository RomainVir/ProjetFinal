import AjouterProduit from "../../../components/ADMIN/AjouterProduit/AjouterProduit";
import ModifierProduit from "../../../components/ADMIN/ModifierProduit/ModifierProduit";
import PublierOffre from "../../../components/ADMIN/PublierOffre/PublierOffre";
import "./AdminBDD.css";
export default function AdminBDD() {
  return (
    <>
      <div className="adminBDD">
        <div className="publierBDD">
          <PublierOffre />
        </div>
      </div>
      <div className="modifier">
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
