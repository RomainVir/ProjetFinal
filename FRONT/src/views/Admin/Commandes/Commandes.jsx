import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import "./commandes.css";
import Swal from "sweetalert2";

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

  if (error)
    return "Oups il y a eu une erreur dans le chargement, veuillez rafraîchir la page!";
  //---------

  //fonction envoyer le tableau par email
  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/user/emailsolicitudes`);
    if (response.status === 200) {
      setButtonChange(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "email enviado",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }

  return (
    <>
      <div className="tableauCommandes">
        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Referencia</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.companyName}</td>
                  <td>{pedido.reference}</td>
                  <td>{pedido.quantity_choosen}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="enviar">
          <button onClick={onSubmit}>Recibir por email</button>
        </div>
      </div>
    </>
  );
}
