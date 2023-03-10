import { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
import Swal from "sweetalert2";

const initialUserState = {
  companyName: "",
  contactSurname: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  town: "",
  type: "",
  password: "",
  confirmPassword: "",
};
export default function Normal() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState(initialUserState);

  function handleInput(event) {
    const newSignIn = {
      ...newUser,
      [event.target.name]: event.target.value,
    };

    setNewUser(newSignIn);
  }

  async function signIn(e) {
    e.preventDefault();
    console.log(newUser);
    fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${newUser.companyName} registrado corectamente`,
          showConfirmButton: false,
          timer: 2000,
        });
        setNewUser(initialUserState);
      } else if (response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: ` ${newUser.email} ya registrado`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
  return (
    <div className="register">
      <form className="formRegister" onSubmit={signIn}>
        <h1>Crear una cuenta</h1>
        <div>
          <input
            type="text"
            name="companyName"
            placeholder="Empresa"
            value={newUser.companyName}
            onChange={handleInput}
          />
          <input
            type="text"
            name="contactSurname"
            required
            placeholder="Apellido del contacto"
            value={newUser.contactSurname}
            onChange={handleInput}
          />
          <input
            type="text"
            name="contactName"
            placeholder="Nombre del contacto"
            value={newUser.contactName}
            onChange={handleInput}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleInput}
          />
          <div>
            <input
              type="text"
              placeholder="Teléfono"
              name="phone"
              value={newUser.phone}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Dirección"
              name="address"
              value={newUser.address}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Código postal"
              name="postalCode"
              value={newUser.postalCode}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Ciudad"
              name="town"
              value={newUser.town}
              onChange={handleInput}
            />
          </div>
          <br />
          <br />
          <label for="asso">
            Selectionar su tipo de estructura : <br /> <br />
          </label>
          <select
            name="type"
            value={newUser.type}
            onChange={handleInput}
            id="assos"
          >
            <option value="vide">Selectionar su tipo de estructura: </option>
            <option value="Association ou fondation reconnue d’utilité publique">
              Association ou fondation reconnue d’utilité publique
            </option>
            <option
              value="Fondation universitaire ou fondation partenariale mentionnées
            respectivement aux articles L. 719-12 et L. 719-13 du code de
            l’éducation"
            >
              Fondation universitaire ou fondation partenariale mentionnées
              respectivement aux articles L. 719-12 et L. 719-13 du code de
              l’éducation
            </option>
            <option value="Fondation d’entreprise">
              Fondation d’entreprise
            </option>
            <option value="Oeuvre ou organisme d’intérêt général">
              Oeuvre ou organisme d’intérêt général
            </option>
            <option value="Musée de France">Musée de France </option>
            <option
              value="Etablissement d’enseignement supérieur ou d’enseignement
              artistique public ou privé, d’intérêt général, à but non lucratif"
            >
              Etablissement d’enseignement supérieur ou d’enseignement
              artistique public ou privé, d’intérêt général, à but non lucratif
            </option>
            <option
              value=" Organisme ayant pour objectif exclusif de participer
              financièrement à la création d’entreprises"
            >
              Organisme ayant pour objectif exclusif de participer
              financièrement à la création d’entreprises
            </option>
            <option
              value="Association cultuelle ou de bienfaisance et établissement public
              reconnus d’Alsace–Moselle"
            >
              Association cultuelle ou de bienfaisance et établissement public
              reconnus d’Alsace–Moselle
            </option>
            <option
              value="Organisme ayant pour activité principale l’organisation de
              festivals"
            >
              Organisme ayant pour activité principale l’organisation de
              festivals
            </option>
            <option
              value="Association fournissant gratuitement une aide alimentaire ou des
              soins médicaux à des personnes en difficultés ou favorisant leur
              logement"
            >
              Association fournissant gratuitement une aide alimentaire ou des
              soins médicaux à des personnes en difficultés ou favorisant leur
              logement
            </option>
            <option
              value="Fondation du patrimoine ou fondation ou association qui affecte
              irrévocablement les dons à la Fondation du patrimoine, en vue de
              subventionner les travaux prévus par les conventions conclues
              entre la Fondation du patrimoine et les propriétaires des
              immeubles (article L. 143-2-1 du code du patrimoine)"
            >
              Fondation du patrimoine ou fondation ou association qui affecte
              irrévocablement les dons à la Fondation du patrimoine, en vue de
              subventionner les travaux prévus par les conventions conclues
              entre la Fondation du patrimoine et les propriétaires des
              immeubles (article L. 143-2-1 du code du patrimoine)
            </option>
            <option
              value="Etablissement de recherche public ou privé, d’intérêt général, à
              but non lucratif"
            >
              Etablissement de recherche public ou privé, d’intérêt général, à
              but non lucratif
            </option>
            <option
              value="Entreprise d’insertion ou entreprise de travail temporaire
              d’insertion (articles L. 5132-5 et L. 5132-6 du code du travail)"
            >
              Entreprise d’insertion ou entreprise de travail temporaire
              d’insertion (articles L. 5132-5 et L. 5132-6 du code du travail)
            </option>
            <option value=" Association intermédiaire (article L.5132-7 du code du travail)">
              Association intermédiaire (article L.5132-7 du code du travail)
            </option>
            <option
              value=" Ateliers et chantiers d’insertion (article L.5132-15 du code du
              travail)"
            >
              Ateliers et chantiers d’insertion (article L.5132-15 du code du
              travail)
            </option>
            <option value="Entreprises adaptées (article L.5213-13 du code du travail)">
              Entreprises adaptées (article L.5213-13 du code du travail)
            </option>
            <option value="Agence nationale de la recherche (ANR)">
              Agence nationale de la recherche (ANR)
            </option>
            <option
              value=" Société ou organisme agrée de recherche scientifique ou technique
              "
            >
              Société ou organisme agrée de recherche scientifique ou technique
            </option>
            <option value="Autres organismes">Autres organismes</option>
          </select>
          <br />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={newUser.password}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Confirmar"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleInput}
          />
        </div>

        <button type="submit">Crear mi cuenta</button>
      </form>
    </div>
  );
}
