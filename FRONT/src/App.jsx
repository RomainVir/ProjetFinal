import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Normal from "./views/Register/RegisterNormal";
import {
  ADMIN,
  OFFRES,
  MONCOMPTE,
  REGISTER,
  PEDIDOS,
  ADMIN2,
  PDF,
  DELIVERIES,
  LOGINGLOBAL,
} from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";
import ModifierCompte from "../src/components/ENTREPRISE/MonCompte/TestCompte";
import Pedidos from "./views/Pedidos/Pedidos";
import ChoisirOffre from "./views/Offres/Offres";
import PublierOffre from "./components/ADMIN/PublierOffre/PublierOffre";
import Pdf from "./views/ViewPDF/ViewPdf";
import Deliveries from "./views/Deliveries/Deliveries";
import { AuthContextProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { ROLES } from "./const/roles.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path={LOGINGLOBAL} element={<LoginGlobal />} />
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
              <Route path={DELIVERIES} element={<Deliveries />} />
            </Route>

            {/*PRIVATE ROUTE USER*/}
            <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
              <Route path={REGISTER} element={<Normal />} />
              <Route path={MONCOMPTE} element={<ModifierCompte />} />
              <Route path={PEDIDOS} element={<Pedidos />} />
              <Route path={PDF} element={<Pdf />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
