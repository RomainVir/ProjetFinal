//supprimer les offre via le bouton
import "./supprimer.css";
import Swal from "sweetalert2";
export default function SupprimerOffre() {
  function ButtonOpen(e) {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro?",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonColor: "#DF093A",
      cancelButtonColor: "blue",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, quiero borrar todas las ofertas!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteOffers();
        Swal.fire({
          title: "Borrado!",
          icon: "success",
          timer: 1200,
        });
      }
    });
  }
  async function DeleteOffers() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`http://localhost:3000/offer/delete_offers`, requestOptions);
  }

  return (
    <div>
      <form className="formSupprimer">
        <h1>
          Eliminar las <br /> donaciones <br /> en curso:
        </h1>

        <button className="delete" onClick={ButtonOpen}>
          Borrar
        </button>
      </form>
    </div>
  );
}
