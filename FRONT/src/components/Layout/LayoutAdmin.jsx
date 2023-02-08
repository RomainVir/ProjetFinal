import { Outlet } from "react-router";
import { HomeMenu } from "../../const/HomeMenu";

import Header from "../Header/Header";
import NavBar from "../Header/NavBar";

export default function LayoutAdmin() {
  return (
    <>
      <Header />
      <NavBar menuItems={HomeMenu} />
      <Outlet />
    </>
  );
}
