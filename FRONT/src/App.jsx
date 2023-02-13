import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Donations from "./views/Donations/Donations";
import Normal from "./views/Register/RegisterNormal";
import { ADMIN, DONATIONS, MONCOMPTE, PANIER, REGISTER } from "./const/routes";
import AdminBDD from "./views/Admin/AdminBDD/AdminBDD";
import LoginGlobal from "./views/Login/LoginGlobal";
import ModifierCompte from "./views/MonCompte/TestCompte";
import Panier from "./views/Panier/Panier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginGlobal />} />
          <Route path={ADMIN} element={<AdminBDD />} />

          <Route path={REGISTER} element={<Normal />} />
          <Route path={DONATIONS} element={<Donations />} />
          <Route path={MONCOMPTE} element={<ModifierCompte />} />
          <Route path={PANIER} element={<Panier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
