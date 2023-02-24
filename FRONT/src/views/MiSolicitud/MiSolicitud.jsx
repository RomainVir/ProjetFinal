import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function Deliveries() {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  //const day = new Date().getDate();
  //const month = new Date().getMonth() + 1;
  //const year = new Date().getFullYear();
  //const date = `${day}/${month}/${year}`;

  const { authorization } = useAuthContext();

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `http://localhost:3000/pedido/getpedidobyuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idCompany: authorization.id }),
        }
      );
      const data = await response.json();
      setData(data);
    }
    getProducts();
  }, []);

  //FETCH PRODUITS---------

  if (error)
    return "Oups il y a eu une erreur dans le chargement, veuillez rafraîchir la page!";
  //---------

  return (
    <>
      <h1>Mi solicitud</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((pedido) => (
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
