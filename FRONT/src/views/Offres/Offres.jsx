import "../../components/ADMIN/PublierOffre/publier.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../components/ADMIN/PublierOffre/publier.css"
export default function ChoisirOffre() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);

  //select et quantité
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(null); // lista de items selected
  const [selectedList, setSelectedList] = useState([]); // lista de items selected

  useEffect(() => {
    getProducts();
  }, []);

  //bouton publier
  async function onSubmit(e) {
    e.preventDefault();
    const selectedListToApiFormat = selectedList.map(
      ({ id, photo, ...rest }) => rest
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedListToApiFormat[0]),
    };
    await fetch(`http://localhost:3000/pedido/add_pedido`, requestOptions);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Produits ajoutés à la demande de dons",
      showConfirmButton: false,
      timer: 1800,
    });
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
        { ...product, quantity_choosen: e.target.value },
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
      <h1>Offre de dons en cours:</h1>
      <div className="tableauglobal">
        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Description</th>
              <th>Photo</th>
              <th>Quantité disponible</th>
              <th>Quantité choisie</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>Photo</td>
               
                <td>{product.quantity}</td>
               
                <td>
                 
                    <input
                      min="0"
                      max={product.quantityMax}
                      placeholder={`Maximum:${product.quantityMax}`}
                      type="number"
                      id={product.id}
                      value={selectedItemQuantity}
                      onChange={(e) => handleForm(e, product)}
                    />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
<button onClick={onSubmit}> Valider </button>
</div>
      </div>
    </>
  );
  
}
