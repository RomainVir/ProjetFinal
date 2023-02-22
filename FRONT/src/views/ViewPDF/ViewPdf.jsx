import React, { useState, useEffect } from "react";

import "./pdf.css";
import { useParams } from "react-router-dom";

export default function Pdf() {
  const [data, setData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`http://localhost:3000/user/users/${id}`);
      setData(response.json());
    }
    getData();
    console.log(data);
  }, []);

  //FETCH DATA

  return (
    <>
      {data === undefined ? (
        <p>Cargando...</p>
      ) : (
        <form>
          <h1>
            Reçu au titre des dons à certains organismes d’intérêt général{" "}
            <br />
            Article 200, 238 bis et 978 du code général des impôts (CGI)
          </h1>
          <div className="formulaire">
            <h2>Bénéficiaire des versements</h2>
            <input
              type="text"
              value={data.companyName}
              placeholder="Nom ou dénomination"
            />
            <div>
              <h4>Adresse</h4>
              <input type="text" value={data.address} placeholder="Adresse" />
              <input
                type="text"
                value={data.postalCode}
                placeholder="Code Postal"
              />
              <input type="text" placeholder={data.town} />
              <input type="text" placeholder="type asso" />
              <br />
            </div>
            <br />
            <textarea
              name="texte"
              id=""
              cols="30"
              rows="5"
              placeholder="Commentaire..."
            ></textarea>
            <button>Envoyer le formulaire</button>
          </div>
        </form>
      )}
    </>
  );
}
