import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import bin from "../../assets/poubelle.png";
import "./misolicitud.css";

export default function Deliveries() {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(true); //mettre á jour en direct le changement
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
  }, [change]);

  if (error)
    return "Oups il y a eu une erreur dans le chargement, veuillez rafraîchir la page!";

  async function DeletePedido(e, pedido) {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pedido }),
    };
    await fetch(`http://localhost:3000/pedido/delete_pedido`, requestOptions);
    setChange(!change); //mettre a jour en direct
  }

  //---------

  return (
    <>
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
                <td>
                  {pedido.quantity_choosen}

                  <button
                    className="bin"
                    onClick={(e) => DeletePedido(e, pedido.id)}
                  >
                    <img src={bin} height="20px" alt="bin" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
