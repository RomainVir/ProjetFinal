import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Deliveries from "../MiSolicitud/MiSolicitud";
import "./pdf.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Pdf() {
  const [data, setData] = useState("");
  const { authorization } = useAuthContext();
  const navigate = useNavigate();

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
      navigate("/cerrarempresa");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Solicitud enviada",
        showConfirmButton: false,
        timer: 1800,
      });
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
              <h3>Cerfa n° 11580*04</h3>
              <h3>
                Reçu au titre des dons à certains organismes d’intérêt général{" "}
                <br />
                Article 200, 238 bis et 978 du code général des impôts (CGI)
              </h3>
              <h4>Bénéficiaire des versements</h4>
              <p>{data.companyName} </p>
              <h4>Adresse</h4>
              <p>{data.address} </p>
              <p> {data.postalCode} </p>
              <p> {data.town} </p>
              <h4>Type de structure:</h4>
              <p>{data.type}</p>
              <h4>Firma:</h4>
              <input type="checkbox" />
              <br />
            </div>
            <button type="submit" className="envoyer">
              Enviar mi solicitud
            </button>
          </form>
        )}

        <div className="deliveries">
          <Deliveries />
        </div>
      </div>
      <div></div>
    </>
  );
}
