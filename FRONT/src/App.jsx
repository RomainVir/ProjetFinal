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
} from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";
import ModifierCompte from "../src/components/ENTREPRISE/MonCompte/TestCompte";
import Pedidos from "./views/Pedidos/Pedidos";
import ChoisirOffre from "./views/Offres/Offres";
import PublierOffre from "./components/ADMIN/PublierOffre/PublierOffre";
import Pdf from "./views/ViewPDF/ViewPdf";

function App() {
  return (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
