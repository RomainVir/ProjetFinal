import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import MonCompte from "./views/MonCompte/MonCompte";
import Admin from "./views/Admin/Admin";
import Register from "./views/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />} />
          <Route path="admin" element={<Admin />} />
          <Route path="donations" element={<Donations />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="moncompte" element={<MonCompte />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
