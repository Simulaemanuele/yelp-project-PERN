import React from "react";
import placeholderImage from "../img/placeholder-image.jpg";

function ImageElement({ src }) {
  return (
    <div>
      <img src={src ? src : placeholderImage} />
    </div>
  );
}

export default ImageElement;
