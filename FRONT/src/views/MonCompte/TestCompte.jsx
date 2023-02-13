import { useState } from "react";
import "./MonCompte.css";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const initialUserState = {
  companyName: "",
  contactSurname: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  town: "",
  password: "",
  confirmPassword: "",
};
export default function ModifierCompte() {
  const utilisateur = useParams();

  const [newModif, setNewModif] = useState(initialUserState);

  function handleInput(event) {
    const Modification = {
      ...newModif,
      [event.target.name]: event.target.value,
    };

    setNewModif(Modification);
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(newModif);
    fetch(`http://localhost:3000/user/${utilisateur.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newModif),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Utilisateur ${newModif.companyName} modifié correctement`,
          showConfirmButton: false,
          timer: 2000,
        });
        setNewModif(initialUserState);
      } else if (response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Utilisateur ${newModif.companyName} déja modifié`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
  return (
    <div className="register">
      <form className="formRegister" onSubmit={onSubmit}>
        <h1>Modifier vos informations</h1>
        <input
          type="text"
          name="companyName"
          placeholder="Entreprise"
          value={newModif.companyName}
          onChange={handleInput}
        />
        <input
          type="text"
          name="contactSurname"
          required
          placeholder="Nom du contact"
          value={newModif.contactSurname}
          onChange={handleInput}
        />
        <input
          type="text"
          name="contactName"
          placeholder="Prénom du contact"
          value={newModif.contactName}
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newModif.email}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Téléphone"
          name="phone"
          value={newModif.phone}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Adresse"
          name="address"
          value={newModif.address}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Code Postal"
          name="postalCode"
          value={newModif.postalCode}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Ville"
          name="town"
          value={newModif.town}
          onChange={handleInput}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={newModif.password}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          name="confirmPassword"
          value={newModif.confirmPassword}
          onChange={handleInput}
        />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}
