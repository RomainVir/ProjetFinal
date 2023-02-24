import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Deliveries from "../MiSolicitud/MiSolicitud";
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
  console.log(authorization.id);
  //FETCH DATA

  return (
    <>
      <div className="bilan">
        {data === undefined ? (
          <p>Cargando...</p>
        ) : (
          <form>
            <div className="formulaire">
              <h3>
                Reçu au titre des dons à certains organismes d’intérêt général{" "}
                <br />
                Article 200, 238 bis et 978 du code général des impôts (CGI)
              </h3>
              <h4>Bénéficiaire des versements</h4>
              <input type="text" value={data.companyName} />
              <div>
                <h4>Adresse</h4>
                <input type="text" value={data.address} />
                <input type="text" value={data.postalCode} />
                <input type="text" value={data.town} />
                <h4>Type de structure:</h4>
                <textarea
                  value={data.type}
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>

                <br />
              </div>
              <br />
              <textarea
                name="texte"
                id=""
                cols="30"
                rows="4"
                placeholder="Commentaire..."
              ></textarea>
            </div>
          </form>
        )}

        <div className="deliveries">
          <Deliveries />
        </div>
      </div>
      <div>
        <button className="envoyer">Envoyer le formulaire</button>
      </div>
    </>
  );
}
