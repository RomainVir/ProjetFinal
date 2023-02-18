import "./publier.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function PublierOffre() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedListToApiFormat),
    };
    await fetch(`http://localhost:3000/offer/add_offer`, requestOptions);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Offre publiée",
      showConfirmButton: false,
      timer: 1800,
    });
  }
  // ajouter qty
  function handleQuantity(e, product) {
    const repeatedItemIndex = selectedList.findIndex(
      (item) => item.id === product.id
    );
    if (repeatedItemIndex !== -1) {
      const newList = [...selectedList];
      newList[repeatedItemIndex].quantity = Number(e.target.value);
      setSelectedList(newList);
    } else {
      setSelectedList([
        ...selectedList,
        { ...product, quantity: e.target.value },
      ]);
    }
  }

  function handleQuantityMax(e, product) {
    const repeatedItemIndex = selectedList.findIndex(
      (item) => item.id === product.id
    );
    if (repeatedItemIndex !== -1) {
      const newList = [...selectedList];
      newList[repeatedItemIndex].quantityMax = Number(e.target.value);
      setSelectedList(newList);
    } else {
      setSelectedList([
        ...selectedList,
        { ...product, quantityMax: e.target.value },
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
    await axios("http://localhost:3000/product/products")
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
      <h1>Publier une offre de dons:</h1>
      <div className="tableauglobal">
        <table>
          <label htmlFor="search">
            <input
              placeholder="Cherchez un produit par référence"
              id="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Description</th>
              <th>Quantité à donner</th>
              <th>Quantité max</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((product) => {
                return search.toLowerCase() === ""
                  ? product
                  : product.reference.toLowerCase().includes(search);
              })
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.reference}</td>
                  <td>{product.description}</td>
                  <td>
                    <input
                      min="0"
                      type="number"
                      id={product.id}
                      value={selectedItemQuantity}
                      onChange={(e) => handleQuantity(e, product)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      id={product.id}
                      value={selectedItemQuantity}
                      onChange={(e) => handleQuantityMax(e, product)}
                    ></input>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <div>
            <button onClick={onSubmit}> Publier </button>
          </div>
        </div>
      </div>
    </>
  );
}
