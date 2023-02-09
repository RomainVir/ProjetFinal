import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import MonCompte from "./views/MonCompte/MonCompte";
import Admin from "./views/Admin/Admin";
import Normal from "./views/Register/RegisterNormal";
import {
  ADMIN,
  DONATIONS,
  MODIFIERBDD,
  MONCOMPTE,
  REGISTER,
} from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />} />
          <Route path={ADMIN} element={<Admin />} />
          <Route path={REGISTER} element={<Normal />} />
          <Route path={DONATIONS} element={<Donations />} />
          <Route path={MONCOMPTE} element={<MonCompte />} />
          <Route path={MODIFIERBDD} element={<AdminBDD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
