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
          <br />
          <input type="checkbox" />
          Association ou fondation reconnue d’utilité publique par décret en
          date du ...... ...... ...... publié au Journal officiel du ......
          ...... ....... ou association <br /> située dans le département de la
          Moselle, du Bas-Rhin ou du Haut-Rhin dont la mission a été reconnue
          d’utilité publique par arrêté en date du ...... ...... ......
          <br />
          <input type="checkbox" />
          Fondation universitaire ou fondation partenariale mentionnées
          respectivement aux articles L. 719-12 et L. 719-13 du code de
          l’éducation <br />
          <input type="checkbox" />
          Fondation d’entreprise <br />
          <input type="checkbox" /> Oeuvre ou organisme d’intérêt général <br />
          <input type="checkbox" /> Musée de France <br />
          <input type="checkbox" /> Etablissement d’enseignement supérieur ou
          d’enseignement artistique public ou privé, d’intérêt général, à but
          non lucratif <br />
          <input type="checkbox" /> Organisme ayant pour objectif exclusif de
          participer financièrement à la création d’entreprises <br />
          <input type="checkbox" /> Association cultuelle ou de bienfaisance et
          établissement public reconnus d’Alsace–Moselle <br />
          <input type="checkbox" /> Organisme ayant pour activité principale
          l’organisation de festivals <br />
          <input type="checkbox" />
          Association fournissant gratuitement une aide alimentaire ou des soins
          médicaux à des personnes en difficultés ou favorisant leur logement
          <br />
          <input type="checkbox" /> Fondation du patrimoine ou fondation ou
          association qui affecte irrévocablement les dons à la Fondation du
          patrimoine, en vue de subventionner <br /> les travaux prévus par les
          conventions conclues entre la Fondation du patrimoine et les
          propriétaires des immeubles (article L. 143-2-1 du code du patrimoine)
          <br />
          <input type="checkbox" /> Etablissement de recherche public ou privé,
          d’intérêt général, à but non lucratif <br />
          <input type="checkbox" />
          Entreprise d’insertion ou entreprise de travail temporaire d’insertion
          (articles L. 5132-5 et L. 5132-6 du code du travail) <br />
          <input type="checkbox" />
          Association intermédiaire (article L.5132-7 du code du travail) <br />
          <input type="checkbox" /> Ateliers et chantiers d’insertion (article
          L.5132-15 du code du travail) <br />
          <input type="checkbox" /> Entreprises adaptées (article L.5213-13 du
          code du travail) <br />
          <input type="checkbox" />
          Agence nationale de la recherche (ANR) <br />
          <input type="checkbox" />
          Société ou organisme agrée de recherche scientifique ou technique (2){" "}
          <br />
          <input type="checkbox" /> Autres organismes:
          <input type="text" placeholder="..." />
        </div>
      </form>
    </>