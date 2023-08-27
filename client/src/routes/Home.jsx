import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";
import NavbarComponent from "../components/NavbarComponent";
import { useLocation } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Home = () => {
  const location = useLocation();
  const { accountData } = useContext(RestaurantsContext);

  useEffect(() => {
    if (location.state) {
      console.log("state in Home screen passed");
    } else {
      console.log("There's a problem!!");
    }
  }, [location.state]);
  console.log("Params passed from navigation: ", location.state);
  return (
    <div>
      <NavbarComponent data={accountData} />
      <Header />
      <div className="m-3">
        <AddRestaurant />
        <RestaurantList data={location.state} />
      </div>
    </div>
  );
};

export default Home;
