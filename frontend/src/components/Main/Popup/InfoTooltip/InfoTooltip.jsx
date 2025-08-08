import { useState } from "react";

function InfoTooltip({ message, isError }) {
  function toggleImage(imageError) {
    if (!imageError) {
      return "./../../../../../images/good_register.png";
    } else {
      return "./../../../../../images/bad_register.png";
    }
  }
  const toolTipImage = toggleImage(isError);

  console.log(message);
  return (
    <div className="popup__container infoBox">
      <img className="infoBox__img" alt="result" src={toolTipImage} />
      <h2 className="infoBox__txt">{message}</h2>
    </div>
  );
}

export default InfoTooltip;
