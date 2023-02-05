import { Outlet } from "react-router";
import { HomeMenu } from "../../const/HomeMenu";
import Header from "../Header/HEader";
import NavBar from "../Header/NavBar";

export default function Layout() {
  return (
    <>
      <Header />
      <NavBar menuItems={HomeMenu} />
      <Outlet />
    </>
  );
}
