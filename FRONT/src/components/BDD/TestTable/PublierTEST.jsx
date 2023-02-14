import "./styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function PublierTEST() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  
//select et quantité
  const [numero, setNumero] = useState({ quantity: 0, selected: 0 });

  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  //bouton publier
  async function onSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: numero.quantity,
        selected: numero.selected,
      }),
    };
    let response = await fetch(
      `http://localhost:3000/product/${id}`,
      requestOptions
    );
    let json = await response.json();
    setNumero(json);
    console.log(json);
  }

  
  function handleForm(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setNumero(newData);
    console.log(newData);
  }

  //FETCH PRODUITS
  async function getData() {
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

  return (
    <>
      <label htmlFor="search">
        <input
          placeholder="Cherchez un produit par référence"
          id="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Sélectionner</th>
            <th>Référence</th>
            <th>Description</th>
            <th>Quantité à donner</th>
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
                <td>
                  <input
                    type="checkbox"
                    value={numero.selected}
                    id={product.id}
                  />
                </td>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>
                  <div className="quantity">
                    <input
                      type="number"
                      id={product.id}
                      value={numero.quantity}
                      onChange={handleForm}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={onSubmit}> Publier </button>
    </>
  );
}
