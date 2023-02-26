import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import "./commandes.css"

export default function Commandes() {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;

  const { authorization } = useAuthContext;

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `http://localhost:3000/pedido/getpedidobyusers`
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
      <div className="tableauCommandes">
        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Referencia</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.companyName}</td>
                  <td>{pedido.reference}</td>
                  <td>{pedido.quantity_choosen}</td>
                  <td>{date}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="enviar">
        <button>Recibir por email</button>
        </div>
      </div>
    </>
  );
}
