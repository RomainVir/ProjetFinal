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
    </>
  );
}
