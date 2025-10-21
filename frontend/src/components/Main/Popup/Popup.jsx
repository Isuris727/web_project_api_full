function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className="popup__container">
        <button
          className="button button_type_close"
          type="button"
          onClick={onClose}
        >
          <img
            className="button__img button__img_type_close"
            alt="Cerrar"
            src="./../images/Icon_close.png"
          />
        </button>
        {title && <h2 className="form__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
