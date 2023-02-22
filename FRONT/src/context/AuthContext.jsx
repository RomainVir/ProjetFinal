import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  email: null,
  role: null,
  id: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

const MY_AUTH_APP = "MY_AUTH_APP";

export function AuthContextProvider({ children }) {
  const [authorization, setAuthorization] = useState(
    JSON.parse(window.localStorage.getItem(MY_AUTH_APP)) ?? {
      email: null,
      role: null,
      id: null,
    }
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
      const decodedToken = jwt_decode(token.jwt);
      const tokenValue = token.jwt;
      const userData = {
        token: tokenValue,
        ...decodedToken,
      };

      setAuthorization(userData);
      localStorage.setItem(MY_AUTH_APP, JSON.stringify(userData));
      setErrorMessage(null);
    } else {
      setErrorMessage(alert("Erreur dans les informations"));
    }
  }

  function logout() {
    localStorage.removeItem(MY_AUTH_APP);
    setAuthorization({
      email: null,
      role: null,
      id: null,
    });
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
