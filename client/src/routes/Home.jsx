import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";
import NavbarComponent from "../components/NavbarComponent";

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
