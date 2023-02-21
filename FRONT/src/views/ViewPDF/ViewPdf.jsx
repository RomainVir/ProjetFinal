import React from "react";
export default function Pdf() {
  const onButtonClick = () => {
    fetch("../../../public/dons.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "../../../public/dons.pdf";
        alink.click();
      });
    });
  };
  return (
    <>
      <center>
        <h1>Télecharger le document à remplir</h1>
        <br />
        <button onClick={onButtonClick}>Télécharger</button>
      </center>
      {/*}
      <h1>
        Reçu au titre des dons à certains organismes d’intérêt général Article
        200, 238 bis et 978 du code général des impôts (CGI)
      </h1>
      <form>
        <input type="text" placeholder="Nom ou dénomination" />
        <h4>Adresse</h4>
        <input type="text" placeholder="Numéro" />
        <input type="text" placeholder="Rue" />
        <input type="text" placeholder="Code Postal" />
        <input type="text" placeholder="Code Postal" />
        <br />
        <textarea
          name="texte"
          id=""
          cols="30"
          rows="10"
          placeholder="Votre commentaire.........."
        ></textarea>{" "}
        <br />
        <h4>Cochez la case concernée (1):</h4>
        <br />
        <input type="checkbox">
          Association ou fondation reconnue d’utilité publique par décret en
          date du ...... ...... ...... publié au Journal officiel du ......
          ...... ....... ou association située dans le département de la
          Moselle, du Bas-Rhin ou du Haut-Rhin dont la mission a été reconnue
          d’utilité publique par arrêté en date du ...... ...... ......
        />
  </form> */}
    </>
  );
}
