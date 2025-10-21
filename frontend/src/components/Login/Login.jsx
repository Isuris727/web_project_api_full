import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";
import Popup from "../Main/Popup/Popup.jsx";
import auth from "../../utils/auth.js";

function Login({ popup, onOpenPopup, onClosePopup }) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const trimmedValue = value.trimStart();
    setData((prevData) => ({
      ...prevData,
      [name]: trimmedValue,
    }));
  }

  async function handleSignIn({ email, password }) {
    try {
      const user = await auth.authorize({ email, password });
      localStorage.setItem("token", user.token);
      //   setCurrentUser(currentUser.email);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("Se ejecutó catch de handleSignIn", error);
    }
  }

  const entryPoint = {
    title: "Inicia sesión",
    shift: "¿Aún no eres miembro? Regístrate ",
    shiftedAuthPoint: "/signup",
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleSignIn(data);
  }

  return (
    <>
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
      <form className="form form_type_auth">
        <h2 className="form__title form__text">{entryPoint.title}</h2>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="form__input form__input_type_auth form__input_type_name"
          placeholder="Correo electrónico"
          required
        />
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="form__input form__input_type_auth"
          placeholder="Contraseña"
          minLength="8"
          required
        />
        <button
          className="button form__button button_type_submit button_type_auth"
          type="submit"
          onClick={handleSubmit}
        >
          {entryPoint.title}
        </button>
        <p className="form__text">
          {entryPoint.shift}
          <Link
            to={entryPoint.shiftedAuthPoint}
            className="button button_type_navbar"
          >
            aqui
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
