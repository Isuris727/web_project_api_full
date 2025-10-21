function ImagePopup(props) {
  const { name, link } = props;

  return (
    <div className="popup__img-container">
      <img className="popup__img" alt={name} src={link} />
      <p className="popup__card-name">{name}</p>
    </div>
  );
}

export default ImagePopup;
