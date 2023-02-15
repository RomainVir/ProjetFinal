import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Panier() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  //FETCH PRODUITS
  async function getData() {
    await axios("http://localhost:3000/offer/offers")
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

  if (chargement) return "Chargement des produits...";
  if (error)
    return "Oups il y a eu une erreur dans le chargement, veuillez rafraîchir la page!";

  return (
    <>
      <div className="donations">
        <h1>Résumé de ma demande de dons:</h1>
        <table>
          <thead>
            <tr>
              <th>Sélectionner</th>
              <th>Référence</th>
              <th>Description</th>
              <th>Quantité  disponible</th>
              <th>Quantité choisie</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>
                  <div className="quantity">
                    <input type="number" id={product.id} />
                  </div>
                </td>
                <td>{product.photo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
