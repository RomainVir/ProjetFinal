import AjouterProduit from "../../../components/ADMIN/AjouterProduit/AjouterProduit";
import ModifierProduit from "../../../components/ADMIN/ModifierProduit/ModifierProduit";
import "./AdminBDD.css";
export default function AdminBDD() {
  return (
    <>
      <div className="modifier">
        <AjouterProduit />
        <ModifierProduit />
      </div>
    </>
  );
}
