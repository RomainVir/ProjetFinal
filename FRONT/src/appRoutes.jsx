import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import MonCompte from "./views/MonCompte/MonCompte";
import Admin from "./views/Admin/Admin";
import Normal from "./views/Register/RegisterNormal";
import ModifierBDD from "./views/ModifierBDD/ModifierBDD";
import { AuthContextProvider } from "./context/AuthContext";
import {
  ADMIN,
  DONATIONS,
  LOGINGLOBAL,
  MODIFIERBDD,
  MONCOMPTE,
  REGISTER,
} from "./const/routes";
import { ROLES } from "./const/roles";

function AppRoutes() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LOGINGLOBAL />} />
            <Route path={ADMIN} element={<Admin />} />
            <Route path={REGISTER} element={<Normal />} />

            <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path={MODIFIERBDD} element={<ModifierBDD />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
              <Route path={DONATIONS} element={<Donations />}>
                <Route path={MONCOMPTE} element={<MonCompte />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
