import React from "react";
import "./pdf.css";
export default function Pdf() {
  /*const onButtonClick = () => {
    fetch("../../../public/dons.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "../../../public/dons.pdf";
        alink.click();
      });
    });
  };*/
  return (
    <>
      <form>
        <h1>
          Reçu au titre des dons à certains organismes d’intérêt général <br />
          Article 200, 238 bis et 978 du code général des impôts (CGI)
        </h1>
        <div className="formulaire">
          <h2>Bénéficiaire des versements</h2>
          <input type="text" placeholder="Nom ou dénomination" />
          <div>
            <h4>Adresse</h4>
            <input type="text" placeholder="Numéro" />
            <input type="text" placeholder="Rue" />
            <input type="text" placeholder="Code Postal" />
            <input type="text" placeholder="Adresse" />
            <br />
          </div>
          <br />
          <textarea
            name="texte"
            id=""
            cols="30"
            rows="10"
            placeholder="Objet..."
          ></textarea>{" "}
          <br />
          <h4>Cochez la case concernée (1):</h4>
          <label for="asso">Selectionner votre type de structure:</label>
          <select name="assos" id="assos">
            <option value="association">
              Association ou fondation reconnue d’utilité publique
            </option>
            <option value="fondationuniversitaire">
              Fondation universitaire ou fondation partenariale mentionnées
              respectivement aux articles L. 719-12 et L. 719-13 du code de
              l’éducation
            </option>
            <option value="fondationentreprise">Fondation d’entreprise</option>
            <option value="oeuvre">
              Oeuvre ou organisme d’intérêt général
            </option>
            <option value="musée">Musée de France </option>
            <option value="etablissement">
              Etablissement d’enseignement supérieur ou d’enseignement
              artistique public ou privé, d’intérêt général, à but non lucratif
            </option>
            <option value="organisme">
              Organisme ayant pour objectif exclusif de participer
              financièrement à la création d’entreprises
            </option>
            <option value="assoculturelle">
              Association cultuelle ou de bienfaisance et établissement public
              reconnus d’Alsace–Moselle
            </option>
            <option value="festival">
              Organisme ayant pour activité principale l’organisation de
              festivals
            </option>
            <option value="alimentaire">
              Association fournissant gratuitement une aide alimentaire ou des
              soins médicaux à des personnes en difficultés ou favorisant leur
              logement
            </option>
            <option value="patrimoine">
              Fondation du patrimoine ou fondation ou association qui affecte
              irrévocablement les dons à la Fondation du patrimoine, en vue de
              subventionner les travaux prévus par les conventions conclues
              entre la Fondation du patrimoine et les propriétaires des
              immeubles (article L. 143-2-1 du code du patrimoine)
            </option>
            <option value="recherche">
              Etablissement de recherche public ou privé, d’intérêt général, à
              but non lucratif
            </option>
            <option value="insertion">
              Entreprise d’insertion ou entreprise de travail temporaire
              d’insertion (articles L. 5132-5 et L. 5132-6 du code du travail)
            </option>
            <option value="inter">
              Association intermédiaire (article L.5132-7 du code du travail)
            </option>
            <option value="atelier">
              Ateliers et chantiers d’insertion (article L.5132-15 du code du
              travail)
            </option>
            <option value="adaptee">
              Entreprises adaptées (article L.5213-13 du code du travail)
            </option>
            <option value="agence">
              Agence nationale de la recherche (ANR)
            </option>
            <option value="recherchescientifique">
              Société ou organisme agrée de recherche scientifique ou technique
              (2)
            </option>
            <option value="autre">Autres organismes</option>
          </select>
          <br />
        <button>Envoyer le formulaire</button>
        </div>
      </form>
    </>
  );
}
