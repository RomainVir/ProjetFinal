import "../Login/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
 
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
        navigate("/");
      } else {
        alert("Wrong credentials, try again");
      }
    });
  }

  return (
    <div className="containerconnexion">
      <div className="container2">
        <div class="login">
          <form onSubmit={loginUser}>
            <h1>Connexion</h1>

            <div class="input-grp">
              <label for="Email"></label>
              <input
                type="email"
                name="email"
                required
                value={User.email}
                onChange={handleLogin}
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
                  />
                </div>
              </div>
            </div>

            <div class="enter">
              <button className="enter" type="submit">
                Entrer
              </button>
              <h4>Première connexion? Cliquez <a href="#">ici</a> pour créer votre compte</h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
