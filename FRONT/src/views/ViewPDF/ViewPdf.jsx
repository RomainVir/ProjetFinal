import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./pdf.css";

export default function Pdf() {
  const [data, setData] = useState("");
  const { authorization } = useAuthContext();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `http://localhost:3000/user/users/${authorization.id}`
      );
      setData(await response.json());
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
            <input type="text" value={data.companyName} />
            <div>
              <h4>Adresse</h4>
              <input type="text" value={data.address} />
              <input type="text" value={data.postalCode} />
              <input type="text" value={data.town} />
              <input type="text" value={data.type} />
              <br />
            </div>
            <br />
            <textarea
              name="texte"
              id=""
              cols="60"
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
