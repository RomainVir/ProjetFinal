import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { HomeMenuAdmin, HomeMenu } from "../../const/HomeMenu";
//import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import NavBar from "../Header/NavBar";

export default function Layout() {
  const { authorization } = useAuthContext();
  
  return (
    <>
      <Header />
      <NavBar menuItems={authorization.role == 1 ? HomeMenuAdmin : HomeMenu} />

      <Outlet />
    </>
  );
}
