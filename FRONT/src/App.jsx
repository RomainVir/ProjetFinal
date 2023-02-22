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

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginGlobal />} />
            <Route path={ADMIN} element={<PublierOffre />} />
            <Route path={ADMIN2} element={<AdminBDD />} />
            <Route path={REGISTER} element={<Normal />} />
            <Route path={OFFRES} element={<ChoisirOffre />} />
            <Route path={MONCOMPTE} element={<ModifierCompte />} />
            <Route path={PEDIDOS} element={<Pedidos />} />
            <Route path={PDF} element={<Pdf />} />
            <Route path={DELIVERIES} element={<Deliveries />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
