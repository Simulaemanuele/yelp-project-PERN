import React, { useContext, useRef, useState } from "react";
import RestaurantList from "../components/RestaurantList";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import restaurantsBackground from "../img/restaurant-background-6.jpg";
import { useOutsideClicker } from "../hooks/useOutsideClicker";
import Loading from "../components/Loading";
import { RestaurantsContext } from "../context/RestaurantsContext";

function ListEditRestaurants() {
  let switchBool = false;
  const [isHover, setIsHover] = useState(false);
  const [pressed, setPressed] = useState(switchBool);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [loading, setLoading] = useState(true);

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handlePressButton = (e) => {
    e.preventDefault();
    setPressed(true);
  };

  const clearForm = () => {
    setName("");
    setLocation("");
    setPriceRange("Price Range");
  };

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, setPressed, clearForm);

  return (
    <div
      style={{
        backgroundImage: `url(${restaurantsBackground})`,
        height:
          loading === true
            ? "100vh"
            : restaurants.length === 0 && loading === false
            ? "100vh"
            : "100%",
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
          justifyContent: loading === false ? "space-around" : "center",
        }}
      >
        {loading === true && <Loading time={500} handleLoading={setLoading} />}
        {loading === false && (!restaurants || restaurants.length === 0) && (
          <div
            style={{
              marginLeft: "20%",
              marginRight: "20%",
              textAlign: "center",
            }}
            className="text-light"
          >
            <div className="display-2">{":'("}</div>
            <h1 className="display-3 text-wrap">
              Sorry something gone wrong! Please, try again later!
            </h1>
          </div>
        )}
        {loading === false && restaurants.length > 0 && (
          <>
            <div style={{ marginTop: "10%", marginBottom: "4%" }}>
              <Header title={"Edit your favourites"} />
            </div>
            <div
              style={{ width: "100%", marginRight: "14.5%" }}
              className="d-flex flex-row justify-content-end"
            >
              <RestaurantList
                restaurants={restaurants}
                setRestaurants={setRestaurants}
              />
              <div style={{ position: "relative" }}>
                <button
                  style={{
                    transform: `scale(${isHover === true ? "1.3" : "1.0"})`,
                    transitionDuration: "500ms",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handlePressButton}
                  disabled={pressed === true ? true : false}
                  className="circle-plus-button"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>

              <div
                ref={wrapperRef}
                style={{
                  marginLeft: "1%",
                }}
                className={`${pressed === true ? "visible" : "hidden"}`}
              >
                <AddRestaurant
                  setPressed={setPressed}
                  name={name}
                  location={location}
                  priceRange={priceRange}
                  setName={setName}
                  setLocation={setLocation}
                  setPriceRange={setPriceRange}
                  clearForm={clearForm}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ListEditRestaurants;
