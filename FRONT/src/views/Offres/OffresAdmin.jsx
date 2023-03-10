import "../../components/ADMIN/PublierOffre/publier.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../components/ADMIN/PublierOffre/publier.css";
import { useAuthContext } from "../../context/AuthContext";
import "../../components/ADMIN/PublierOffre/publier.css";

export default function OffresAdmin() {
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  const { authorization } = useAuthContext();

  //select et quantité
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(null); // lista de items selected
  const [selectedList, setSelectedList] = useState([]); // lista de items selected

  useEffect(() => {
    getProducts();
  }, []);

  //bouton valider
  async function onSubmit(e) {
    e.preventDefault();
    const selectedListToApiFormat = selectedList.map(
      ({ id, photo, ...rest }) => rest
    );
    console.log(selectedListToApiFormat);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedListToApiFormat),
    };
    const response = await fetch(
      `http://localhost:3000/pedido/add_pedido`,
      requestOptions
    );

    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Añadido a la solicitud",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }
  // ajouter qty
  function handleForm(e, product) {
    const repeatedItemIndex = selectedList.findIndex(
      (item) => item.id === product.id
    );

    if (repeatedItemIndex > -1) {
      const newList = [...selectedList];
      newList[repeatedItemIndex].quantity_choosen = Number(e.target.value);
      setSelectedList(newList);
    } else {
      setSelectedList([
        ...selectedList,
        {
          ...product,
          quantity_choosen: e.target.value,
          idCompany: authorization.id,
        },
      ]);
    }
  }
  console.log(selectedList);
  //FETCH PRODUITS---------
  async function getProducts() {
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
  //---------

  return (
    <>
      <h1 className="h1Publier"> Donaciones actuales</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Descripción</th>
              <th>Foto</th>
              <th>Cantidad disponible</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.photo} height="100px" />
                </td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={onSubmit}> Validar </button>
        </div>
      </div>
    </>
  );
}
