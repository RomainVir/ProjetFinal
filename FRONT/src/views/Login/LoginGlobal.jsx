import Header from "../../components/Header/Header";
import LoginAdmin from "./LoginAdmin";
import "./LoginGlobal.css";
import "../../components/Header/Header.css";

export default function LoginGlobal() {
  return (
    <>
      <div className="loginglobal">
        <LoginAdmin />
      </div>
    </>
  );
}
