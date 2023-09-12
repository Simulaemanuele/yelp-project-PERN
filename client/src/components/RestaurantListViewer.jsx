import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RestaurantListViewer = ({ img, goTo, text }) => {
  const [hover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const navigate = useNavigate();
  const handleNavigateOnClick = () => {
    navigate(`/${goTo}`);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "40vh",
        width: "30vw",
        objectFit: "fill",
        borderRadius: 25,
        boxShadow: "0px 0px 10px #999999",
        cursor: "pointer",
        transform: `scale(${hover === true ? "1.1" : "1.0"})`,
        transitionDuration: "500ms",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleNavigateOnClick()}
    >
      <div
        style={{
          backgroundColor: `${
            hover === true ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.4)"
          }`,
          width: "100%",
          height: "100%",
        }}
        className="d-flex justify-content-center align-items-end pb-5"
      >
        <p
          style={{
            fontWeight: `${hover === true ? "500" : ""}`,
            fontFamily: "arboria-light",
            color: `${
              hover === true ? "rgb(255,255,255)" : "rgba(255,255,255,0.8)"
            }`,
          }}
          className={`display-4`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
