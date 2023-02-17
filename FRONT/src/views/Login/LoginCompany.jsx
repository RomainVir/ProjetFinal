import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LogInCompany() {
  //LOGIN ************
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleLogin(e) {
    const newLogin = {
      ...User,
      [e.target.name]: e.target.value,
    };
    setUser(newLogin);
  }

  async function loginUser(e) {
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
          title: `Bienvenue ${User.email} !`,
          showConfirmButton: false,
          timer: 2000,
        });
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
  }

  return (
    <div className="containerconnexion">
      <div className="container2">
        <div class="loginPartenaire">
          <form className="admin" onSubmit={loginUser}>
            <h1>Connexion Partenaire</h1>

            <div class="input-grp">
              <label for="Email"></label>
              <input
                type="email"
                name="email"
                required
                value={User.email}
                onChange={handleLogin}
                placeholder="Entrez votre adresse email"
              />

              <div class="input-grp">
                <label for="Password"></label>
                <div class="input-grp">
                  <input
                    placeholder="Entrez votre mot de passe"
                    type="password"
                    name="password"
                    required
                    value={User.password}
                    onChange={handleLogin}
                  />
                </div>
              </div>
            </div>

            <div class="enter">
              <button className="enter" type="submit">
                Entrer
              </button>
              <h4>
                Première connexion? Cliquez{" "}
                <span>
                  <a href="/register">ici</a>
                </span>{" "}
                pour créer votre compte
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
