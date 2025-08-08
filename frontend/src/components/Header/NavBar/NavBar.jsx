import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);

  const location = useLocation().pathname;

  function shiftNavBarBtnText(location) {
    const NavBarBtn = {};

    if (location === "/signup") {
      NavBarBtn.text = "Iniciar sesión";
      NavBarBtn.path = "/signin";
      return NavBarBtn;
    } else if (location === "/signin") {
      NavBarBtn.text = "Registrate";
      NavBarBtn.path = "/signup";
      return NavBarBtn;
    }
  }

  const button = shiftNavBarBtnText(location);

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }

  if (isLoggedIn) {
    return (
      <>
        <div className="button button_type_navbar"> {currentUser.email} </div>
        <button className="button  button_type_navbar" onClick={handleLogOut}>
          Cerrar Sesión
        </button>
      </>
    );
  } else {
    return (
      <Link to={button.path} className="button  button_type_navbar">
        {button.text}
      </Link>
    );
  }
}

export default NavBar;
