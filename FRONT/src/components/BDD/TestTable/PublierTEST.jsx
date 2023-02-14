import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function PublierTEST() {
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [donation, setDonation] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //AJOUTERr
  const handleIncrease = (cardid) => {
    setDonation((donation) =>
      donation.map((product) =>
        cardid === product.id
          ? { ...product, product_qty: product.quantity - 1 }
          : product
      )
    );
  };

  const handleDecrease = (cardid) => {
    setDonation((donation) =>
      donation.map((product) =>
        cardid === product.id
          ? { ...product, product_qty: product.quantity + 1 }
          : product
      )
    );
  };

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
          placeholder="Cherchez un prodit par référence"
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
                  <input type="checkbox" />
                </td>
                <td>{product.reference}</td>
                <td>{product.description}</td>
                <td>
                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() => handleDecrease(product)}
                    >
                      -
                    </button>
                    <input type="number" />
                    {product.quantity}
                    <button
                      type="button"
                      onClick={() => handleIncrease(product)}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
