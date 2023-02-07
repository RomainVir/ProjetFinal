import { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";

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
        throw "No autorizado";
      } else if (response.status === 200) {
        navigate("/");
        alert(`User ${newUser.name} signed-in successfully`);
        setNewUser(initialUserState);
      } else if (response.status === 409) {
        alert(`Usuario ya registrado`);
      }
    });
  }
  return (
    <div>
      <form onSubmit={signIn}>
        <input
          type="text"
          name="companyName"
          placeholder="Entreprise"
          value={newUser.companyName}
          onChange={handleInput}
        />
        <input
          type="text"
          name="contactSurname"
          required
          placeholder="Nom du contact"
          value={newUser.contactSurname}
          onChange={handleInput}
        />
        <input
          type="text"
          name="contactName"
          placeholder="Prénom du contact"
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
        <input
          type="text"
          placeholder="Téléphone"
          name="phone"
          value={newUser.phone}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Adresse"
          name="address"
          value={newUser.address}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Code Postal"
          name="postalCode"
          value={newUser.postalCode}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Ville"
          name="town"
          value={newUser.town}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={newUser.password}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={handleInput}
        />

        <button type="submit">Sign-In</button>
      </form>
    </div>
  );
}
