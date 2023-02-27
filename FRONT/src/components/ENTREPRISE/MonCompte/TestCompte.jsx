import { useAuthContext } from "../../../context/AuthContext";
import React, { useState, useEffect } from "react";
import "./modifier.css";

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
    <div className="modifier">
      <form className="formModifier">
        <h1>Modificar mis datos</h1>
        <div>
          <input type="text" name="companyName" value={data.companyName} />
          <input
            type="text"
            value={data.contactSurname}
            name="contactSurname"
            required
          />
        </div>
        <div>
          <input type="text" name="contactName" value={data.contactName} />
          <input type="email" value={data.email} name="email" />
        </div>
        <div>
          <input type="text" value={data.phone} name="phone" />
          <input type="text" value={data.address} name="address" />
          <div>
            <input type="text" value={data.postalCode} name="postalCode" />
            <input type="text" value={data.town} name="town" />
          </div>
          <br />
          <input type="password" value={data.password} name="password" />
          <input
            type="password"
            placeholder="Confirmar"
            name="confirmPassword"
          />
        </div>

        <button type="submit">Modificar</button>
      </form>
    </div>
  );
}
