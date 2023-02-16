import "./stylesOffres.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Offres() {
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
    const selectedListToApiFormat = selectedList.map(({ id, ...rest }) => rest);
    console.log(selectedListToApiFormat, "prueba");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedListToApiFormat),
    };
    await fetch(`http://localhost:3000/pedido/add_pedido`, requestOptions);
  }
  // ajouter qty
  function handleForm(e, product) {
    const repeatedItemIndex = selectedList.findIndex(
      (item) => item.id === product.id
    );
    console.log(repeatedItemIndex);
    if (repeatedItemIndex !== -1) {
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
  //checkbox
  function handleCheckBox() {
    //setNumero(!numero.selected);
  }

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
      <div className="donations">
        <button onClick={onSubmit}> Valider </button>

        <div className="tableauglobal">
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Description</th>
                <th>Quantité disponible</th>
                <th>Quantité choisie</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td>{product.reference}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div className="quantity">
                      <input
                        min="0"
                        type="number"
                        id={product.id}
                        value={selectedItemQuantity}
                        onChange={(e) => handleForm(e, product)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
