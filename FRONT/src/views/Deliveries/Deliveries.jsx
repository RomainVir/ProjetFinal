import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

export default function Deliveries() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  //const day = new Date().getDate();
  //const month = new Date().getMonth() + 1;
  //const year = new Date().getFullYear();
  //const date = `${day}/${month}/${year}`;

  const { authorization } = useAuthContext();

  useEffect(() => {
    getProducts();
  }, []);

  //FETCH PRODUITS---------
  async function getProducts() {
    await axios(`http://localhost:3000/pedido/pedidos`)
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

  return (
    <>
      <h1>Demandes de dons</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Référence produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.description}</td>
                <td>{pedido.quantity_choosen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
