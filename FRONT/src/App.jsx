import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import MonCompte from "./views/MonCompte/MonCompte";
import Admin from "./views/Admin/Admin";
import Normal from "./views/Register/RegisterNormal";
import ModifierBDD from "./views/ModifierBDD/ModifierBDD";
import {
  ADMIN,
  DONATIONS,
  MODIFIERBDD,
  MONCOMPTE,
  REGISTER,
} from "./const/routes";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />}></Route>
        </Route>

        <Route path={ADMIN} element={<LayoutAdmin />}>
          <Route index element={<Admin />} />
          <Route path={REGISTER} element={<Normal />} />
          <Route path={DONATIONS} element={<Donations />} />
          <Route path={MONCOMPTE} element={<MonCompte />} />
          <Route path={MODIFIERBDD} element={<ModifierBDD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
