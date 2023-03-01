import AjouterProduit from "../../../components/ADMIN/AjouterProduit/AjouterProduit";
import DeleteOffers from "../../../components/ADMIN/SupprimerOffres/SupprimerOffre";
import "./AdminBDD.css";
import SupprimerProduit from "../../../components/ADMIN/SupprimerProduit/SupprimerProduit";
export default function AdminBDD() {
  return (
    <>
      <div className="modifier">
        <AjouterProduit />
        <SupprimerProduit />
        <DeleteOffers />
      </div>
    </>
  );
}
