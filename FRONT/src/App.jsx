import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogIn from "./views/Login/Login";
import Donations from "./views/Donations/Donations";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import MonCompte from "./views/MonCompte/MonCompte";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LogIn />} />
          <Route path="donations" element={<Donations />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="moncompte" element={<MonCompte />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
