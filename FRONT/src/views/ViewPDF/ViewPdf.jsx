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

  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/user/email/${authorization.id}`
    );
    if (response.status === 200) {
      alert("SEND");
    }
  }

  return (
    <>
      <div className="bilan">
        {data === undefined ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="formulaire">
              <h5>Cerfa n° 11580*04</h5>
              <h3>
                Reçu au titre des dons à certains organismes d’intérêt général{" "}
                <br />
                Article 200, 238 bis et 978 du code général des impôts (CGI)
              </h3>
              <h4>Bénéficiaire des versements</h4>
              <p>{data.companyName} </p>
              <div>
                <h3>Adresse</h3>
                <p>{data.address} </p>
                <p> {data.postalCode} </p>
                <p> {data.town} </p>
                <h4>Type de structure:</h4>
                <p>{data.type}</p>

                <br />
              </div>
              <br />
            </div>
        <button type="submit" className="envoyer">
          Envoyer le formulaire
        </button>
          </form>
        )}

        <div className="deliveries">
          <Deliveries />
        </div>
      </div>
      <div>
      </div>
    </>
  );
}
