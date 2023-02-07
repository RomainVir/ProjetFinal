import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import MonCompte from "./views/MonCompte/MonCompte";
import Admin from "./views/Admin/Admin";
import Normal from "./views/Register/RegisterNormal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />} />
          <Route path="admin" element={<Admin />} />
          <Route path="donations" element={<Donations />} />
          <Route path="moncompte" element={<MonCompte />} />
          <Route path="register" element={<Normal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
