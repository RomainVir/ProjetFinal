//supprimer les offre via le bouton

import Swal from "sweetalert2";
export default function SupprimerOffre() {
  async function DeleteOffers() {
    console.log("entraaaaaaaa");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:3000/offer/delete_offers`,
      requestOptions
    );

    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Offres supprimées",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }

  return (
    <form className="formModifier">
      <h1>
        Supprimer les <br /> offres en cours
      </h1>
      <h3>
        Attention, cette action va supprimer les offres en cours, <br />
        assurez-vous que les donations sont terminées
      </h3>

      <button onClick={() => DeleteOffers()}>
        Supprimer les offres en cours
      </button>
    </form>
  );
}
