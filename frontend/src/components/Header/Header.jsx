import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import NavBar from "./NavBar/NavBar";

function Header() {
  return (
    <header className="header page__header">
      <img
        className="header__logo"
        alt="Logo Around the U.S."
        src="./../images/Vector_around.png"
      />
      <NavBar />
    </header>
  );
}

export default Header;
