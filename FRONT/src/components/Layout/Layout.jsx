import { Outlet } from "react-router";
import { HomeMenu } from "../../const/HomeMenu";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import NavBar from "../Header/NavBar";

export default function Layout() {
  return (
    <>
      <Header />
      <NavBar menuItems={HomeMenu} />

      <Outlet />
      <Footer />
    </>
  );
}
