import { useAuthContext } from "../../../context/AuthContext";
import React, { useState, useEffect } from "react";

export default function ModifierCompte() {
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

  return (
    <div className="register">
      <form className="formRegister">
        <h1>Modificar tus informaciones</h1>
        <input type="text" name="companyName" value={data.companyName} />
        <input
          type="text"
          value={data.contactSurname}
          name="contactSurname"
          required
        />
        <input type="text" name="contactName" value={data.contactName} />
        <input type="email" value={data.email} name="email" />
        <input type="text" value={data.phone} name="phone" />
        <input type="text" value={data.address} name="address" />
        <input type="text" value={data.postalCode} name="postalCode" />
        <input type="text" value={data.town} name="town" />
        <br />
        <input type="password" value={data.password} name="password" />
        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          name="confirmPassword"
        />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}
