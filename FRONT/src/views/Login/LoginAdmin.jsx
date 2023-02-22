import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginAdmin() {
  //LOGIN ************
  const { login } = useAuthContext();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    setUser({ ...User, [e.target.name]: e.target.value });
  }

  /*async function loginUser(e) {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    }).then((response) => {
      if (response.status === 401) {
        throw "Not authorized";
      } else if (response.status == 200) {
        navigate("/admin");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Administrateur connecté",
          showConfirmButton: false,
          timer: 2000,
        });
        //alert("Admin connecté");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Identifiants incorrects",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  } */

  return (
    <div class="loginForm">
      <form className="adminform" onSubmit={(e) => login(e, User)}>
        <h1>Connexion Admin</h1>

        <div className="inputLogin">
          <div class="input-grp">
            <label for="Email"></label>
            <input
              type="email"
              name="email"
              required
              value={User.email}
              onChange={handleLogin}
              placeholder="Email"
            />

            <div class="input-grp">
              <label for="Password"></label>
              <div class="input-grp">
                <input
                  type="password"
                  name="password"
                  required
                  value={User.password}
                  onChange={handleLogin}
                  placeholder="Mot de passe"
                />
              </div>
            </div>
          </div>

          <div class="enter">
            <button className="enter" type="submit">
              Entrer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
