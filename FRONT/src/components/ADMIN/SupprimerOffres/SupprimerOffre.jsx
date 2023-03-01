//supprimer les offre via le bouton
import "./supprimer.css";
import Swal from "sweetalert2";
export default function SupprimerOffre() {
  async function DeleteOffers() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:3000/offer/delete_offers`,
      requestOptions
    );

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (response.status === 200) {
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    }
  }

  return (
    <div>
      <form className="formSupprimer">
        <h1>
          Eliminar las <br /> donaciones <br /> en curso:
        </h1>

        <button className="delete" onClick={() => DeleteOffers()}>
          Borrar
        </button>
      </form>
    </div>
  );
}
