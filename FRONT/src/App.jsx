import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Donations from "./views/Donations/Donations";
import MonCompte from "./views/MonCompte/MonCompte";
import Normal from "./views/Register/RegisterNormal";
import { ADMIN, DONATIONS, MONCOMPTE, REGISTER } from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginGlobal />} />
          <Route path={ADMIN} element={<AdminBDD />} />

          <Route path={REGISTER} element={<Normal />} />
          <Route path={DONATIONS} element={<Donations />} />
          <Route path={MONCOMPTE} element={<MonCompte />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
