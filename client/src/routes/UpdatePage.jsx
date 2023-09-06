import React from "react";
import UpdateComponent from "../components/UpdateComponent";
import restaurantBackground from "../img/restaurant-background-5.jpg";
// import NavbarComponent from "../components/NavbarComponent";
// import { RestaurantsContext } from "../context/RestaurantsContext";

const UpdatePage = () => {
  // const { accountData } = useContext(RestaurantsContext);
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="d-flex justify-content-center align-items-center my-xl-3 py-xl-3">
          <h1 className="text-center text-white display-1">
            Update Restaurant
          </h1>
        </div>
        <UpdateComponent />
      </div>
    </div>
  );
};

export default UpdatePage;
