import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Normal from "./views/Register/RegisterNormal";
import { ADMIN, OFFRES, MONCOMPTE, REGISTER, PEDIDOS } from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";
import ModifierCompte from "../src/components/ENTREPRISE/MonCompte/TestCompte";
import Offres from "./views/Offres/Offres";
import Pedidos from "./views/Pedidos/Pedidos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginGlobal />} />
          <Route path={ADMIN} element={<AdminBDD />} />
          <Route path={REGISTER} element={<Normal />} />
          <Route path={OFFRES} element={<Offres />} />
          <Route path={MONCOMPTE} element={<ModifierCompte />} />
          <Route path={PEDIDOS} element={<Pedidos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
