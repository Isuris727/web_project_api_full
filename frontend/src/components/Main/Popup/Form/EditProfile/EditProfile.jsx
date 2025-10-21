import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value.trimStart());
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.trimStart());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="profile__form popup__form form"
      name="profileForm"
      onSubmit={handleSubmit}
    >
      <h2 className="form__title">Editar perfil</h2>
      <input
        className="form__input form__input_type_name"
        id="profile-name-input"
        type="text"
        placeholder="Nombre"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="profile-name-input-error form__input-error"></span>
      <input
        className="form__input form__input_type_about"
        id="profile-about-input"
        type="text"
        placeholder="Acerca de mí"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="profile-about-input-error form__input-error"></span>
      <button className="button button_type_submit form__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
