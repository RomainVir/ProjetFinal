import AjouterProduit from "../../../components/ADMIN/AjouterProduit/AjouterProduit";
import ModifierProduit from "../../../components/ADMIN/ModifierProduit/ModifierProduit";
import DeleteOffers from "../../../components/ADMIN/SupprimerOffre/SupprimerOffre";
import "./AdminBDD.css";
export default function AdminBDD() {
  return (
    <>
      <div className="modifier">
        <AjouterProduit />
        <ModifierProduit />
        <DeleteOffers />
      </div>
    </>
  );
}
