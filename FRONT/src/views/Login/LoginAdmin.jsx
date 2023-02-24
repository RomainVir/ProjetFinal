import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginAdmin() {
  //LOGIN ************
  const { login } = useAuthContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
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
    <div className="loginForm">
      <form className="adminform" onSubmit={(e) => login(e, user)}>
        <h1>Connexión</h1>

        <div className="inputLogin">
          <div className="input-grp">
            <input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={handleLogin}
              placeholder="Email"
            />

            <div className="input-grp">
              <div className="input-grp">
                <input
                  type="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={handleLogin}
                  placeholder="Contraseña"
                />
              </div>
            </div>
          </div>

          <div className="enter">
            <button className="enter" type="submit">
              Entrar
            </button>
            <p>
              Puedes registrarte aquí <a href="/register">ici</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
