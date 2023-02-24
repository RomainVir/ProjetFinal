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

    const selectedListToApiFormat =
      selectedList.length > 0 &&
      selectedList.map(({ id, ...rest }) => {
        if (rest.quantityMax === 0) {
          rest.quantityMax = rest.quantity;
        }
        return rest;
      });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedListToApiFormat),
    };
    const response = await fetch(
      `http://localhost:3000/offer/add_offer`,
      requestOptions
    );

    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Offre publiée",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }
  // ajouter qty
  function handleQuantity(e, product) {
    const repeatedItemIndex = selectedList.findIndex(
      (item) => item.id === product.id
    );
    if (repeatedItemIndex !== -1) {
      const newList = [...selectedList];
      if (Number(e.target.value) !== 0) {
        newList[repeatedItemIndex].quantity = Number(e.target.value);
        setSelectedList(newList);
      }
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

  //FETCH PRODUITS---------
  async function getProducts() {
    try {
      const response = await axios("http://localhost:3000/product/products");
      setData(response.data);
      setError(error);
      setChargement(false);
    } catch (e) {
      console.log(e.message);
    }
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
              placeholder="Buscar un producto por referencia..."
              id="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Descripción</th>
              <th>Photo</th>
              <th>Cantidad a dar</th>
              <th>Cantidad maximum eligible</th>
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
                    <img src={product.photo} height="100px"></img>
                  </td>
                  <td>
                    <input
                      pattern="0"
                      min="1"
                      type="number"
                      placeholder="Cantidad"
                      id={product.id}
                      value={selectedItemQuantity}
                      onChange={(e) => handleQuantity(e, product)}
                    />
                  </td>
                  <td>
                    <input
                      pattern="0"
                      placeholder="Maximum"
                      type="number"
                      min="1"
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
            <button onClick={onSubmit}> Publicar </button>
          </div>
        </div>
      </div>
    </>
  );
}
