import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/ADMIN/PublierOffre/publier.css";
import "./pedidos.css";

export default function Pedidos() {
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  // valider la demande

  async function onSubmit(e) {
    e.preventDefault();
    const selectedListPedidos = data.map(({ reference,  ...rest }) => reference);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedListPedidos,idCompany: 27, date: new Date()}),
    };
    const response = await fetch(
      `http://localhost:3000/delivery/add_delivery`,
      requestOptions
    );

    if (response.status === 200) {
      alert("envoyé");
    }
  }
  //FETCH PRODUITS
  async function getData() {
    await axios("http://localhost:3000/pedido/pedidos")
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
      <h1>Résumé de ma demande de dons:</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Description</th>

              <th>Quantité choisie</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>{product.quantity_choosen}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={onSubmit}> Valider ma demande</button>
          <button>
            <a href="/pdf">Remplir le CERFA</a>
          </button>
        </div>
      </div>
    </>
  );
}
