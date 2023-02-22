import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Deliveries() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;

  useEffect(() => {
    getProducts();
  }, []);

  //FETCH PRODUITS---------
  async function getProducts() {
    await axios("http://localhost:3000/delivery/deliveries")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setChargement(false);
      });
  }

  if (chargement) return "Chargement des demandes...";
  if (error)
    return "Oups il y a eu une erreur dans le chargement, veuillez rafraîchir la page!";
  //---------
  //supprimer les offre via le bouton
  async function DeleteOffers(e) {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`http://localhost:3000/offer/delete_offers`, requestOptions);

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
    <>
      <h1>Demandes de dons</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Référence produit</th>
              <th>Quantité</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.companyName}</td>
                <td>{delivery.idProduct}</td>
                <td>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={DeleteOffers}>Supprimer les offres en cours</button>
        </div>
      </div>
    </>
  );
}
