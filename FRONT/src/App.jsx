import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Normal from "./views/Register/RegisterNormal";
import {
  ADMIN,
  OFFRES,
  MONCOMPTE,
  REGISTER,
  //PEDIDOS,
  ADMIN2,
  PDF,
  COMMANDES,
  LOGOUTEMPRESA,
  LOGOUTADMIN,
} from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";
import ModifierCompte from "../src/components/ENTREPRISE/MonCompte/TestCompte";
import ChoisirOffre from "./views/Offres/Offres";
import PublierOffre from "./components/ADMIN/PublierOffre/PublierOffre";
import Pdf from "./views/ViewPDF/ViewPdf";
import { AuthContextProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { ROLES } from "./const/roles.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Adios from "./views/Logout/LogoutAdmin";
import Commandes from "./views/Admin/Commandes/Commandes";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route index element={<LoginGlobal />} />
              <Route path={REGISTER} element={<Normal />} />
            </Route>
            <Route
              element={
                <PrivateRoute allowedRoles={[ROLES.Admin, ROLES.User]} />
              }
            >
              <Route path={OFFRES} element={<ChoisirOffre />} />
            </Route>

            {/*PRIVATE ROUTE ADMIN*/}
            <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path={ADMIN} element={<PublierOffre />} />
              <Route path={ADMIN2} element={<AdminBDD />} />
              <Route path={COMMANDES} element={<Commandes />} />
              <Route path={LOGOUTADMIN} element={<Adios />} />
            </Route>

            {/*PRIVATE ROUTE USER*/}
            <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
              
              <Route path={MONCOMPTE} element={<ModifierCompte />} />
              <Route path={COMMANDES} element={<Commandes />} />
              <Route path={PDF} element={<Pdf />} />
              <Route path={LOGOUTEMPRESA} element={<Adios />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
