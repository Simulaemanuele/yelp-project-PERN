import React, { useState } from "react";
import RestaurantList from "../components/RestaurantList";
import Header from "../components/Header";
import restaurantsBackground from "../img/restaurant-background-6.jpg";

function ListEditRestaurants() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${restaurantsBackground})`,
        height: "130vh",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Header title={"Edit your favourites"} />
        <div className="d-flex flex-row justify-content-center">
          <RestaurantList />
          <div style={{ position: "relative" }}>
            <button
              style={{
                transform: `scale(${isHover === true ? "1.3" : "1.0"})`,
                transitionDuration: "500ms",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="circle-plus-button"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListEditRestaurants;
