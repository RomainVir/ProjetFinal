import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  authorization: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

const MY_AUTH_APP = "MY_AUTH_APP";

export function AuthContextProvider({ children }) {
  const [authorization, setAuthorization] = useState(
    JSON.parse(window.localStorage.getItem(MY_AUTH_APP)) ?? null
  );
  const [errorMessage, setErrorMessage] = useState(null);

  async function login(e, user) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      const token = await response.json();
      setAuthorization(jwt_decode(token.jwt));
      window.localStorage.setItem(
        MY_AUTH_APP,
        JSON.stringify(jwt_decode(token.jwt))
      );
      setErrorMessage(null);
    } else {
      setErrorMessage(alert("Erreur dans les informations"));
    }
  }

  function logout() {
    window.localStorage.removeItem(MY_AUTH_APP);
    setAuthorization(null);
  }

  const value = {
    authorization,
    errorMessage,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}